//Creating Token and saving in cookie
const sendToken =(user,statusCode,res)=>{
    const token=user.getJWTToken();
    //options for cookie
    const options={
        httpOnly:true,
        expire:new Date(Date.now+process.env.COOKIE_EXPIRE*24*60*60*1000)
    }
    res.status(statusCode).cookie('token',token,options).
    json({
        success:true,
        user,
        token
    })
}
module.exports=sendToken;