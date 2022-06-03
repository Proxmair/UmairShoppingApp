const User=require('../models/userModel');
const ErrorHandler = require("../utils/errorHandler");
const AsyncErrors=require("../middleware/asyncErrors");
const sendToken = require('../utils/JwtToken');
const sendEmail=require('../utils/sendEmail')
const crypto=require('crypto');
const cloudinary=require('cloudinary');
//Register User
exports.registerUser=AsyncErrors(async(req,res,next)=>{
    const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
      folder:"avatars",
      width:150,
      crop:"scale",
    });
    const {name,email,password}=req.body;
    const user=await User.create(
        {
        name,email,password,avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
    });
    sendToken(user,201,res)

})

//Login User

exports.LoginUser=AsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email|| !password){
        return next(new ErrorHandler("Please Enter Email and Password",400))
    }
    const user=await User.findOne({email}).select("+password");
  
    if(!user){
        return next(new ErrorHandler("Invalid Password or Emial",401))
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password",401))
    }
    sendToken(user,200,res)
})
//Logout User
exports.LogoutUser=AsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Successfully Logged out"
    })
})

//Forgot Password
exports.forgotPassword=AsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    /* const resetPasswordUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`; */
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
    try {
      await sendEmail({
        email: user.email,
        subject: `Ecommerce Password Recovery`,
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new ErrorHandler(error.message, 500));
    }
  });

exports.resetPassword=AsyncErrors(async(req,res,next)=>{
    //Creating Token Hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");


    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if (!user) {
        return next(new ErrorHandler("Reset Password Token is invalid or has been expire", 400));
    }
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 400));
    }
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save()
    sendToken(user,200,res) 
})
//Get User Details
exports.getUserDetails=AsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id)
    res.status(200).json({
        success:true,
        user
    })
})
//Update User Password
exports.updateUserPassword=AsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is not correct",400))
    }
    if(req.body.newPassword!=req.body.confirmPassword){
        return next(new ErrorHandler("Confirm Password does not match",400))
    }
    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,200,res);
    res.status(200).json({
        success:true,
        user
    })
})

//Update User Profile
exports.updateProfile = AsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.avatar !== 'undefined') {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }


  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});


//Get All Users For Admin
exports.getAllUser=AsyncErrors(async(req,res,next)=>{
    const users=await User.find();
    res.status(200).json({
        success:true,
        users,
    })
})
//Get Single Users For Admin
exports.getSingleUser=AsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if (!user) {
        return next(
          new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
        );
      }
      res.status(200).json({
        success: true,
        user,
      });
})
//Update Roles For Admin
exports.updateUserRole=AsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      res.status(200).json({
        success: true,
        message: "User Role Updated Successfully",
      });
})
//Delete User For Admin
exports.deleteUser=AsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }
  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
})