const Banner = require("../models/BannerModel");
const ErrorHandler = require("../utils/errorHandler");
const AsyncErrors = require("../middleware/asyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require('cloudinary');

//Create Banner ..For Admin
exports.createBanner = AsyncErrors(async (req, res, next) => {
  const result = await cloudinary.v2.uploader.upload(req.body.images, {
    folder: "banners",
  });
  const banner = await Banner.create({link:req.body.Link,image:{public_id:result.public_id,url:result.secure_url}}); 
  res.status(201).json({
    success: true,
    banner,
  });
})
//Get All Banner ..For Users

exports.getAllBanner = AsyncErrors(async (req, res, next) => {
  const banners = await Banner.find()
  res.status(200).json({
    success: true,
    banners,
  })
})
//Delete Banner ..For Admin
exports.deleteBanner = AsyncErrors(async (req, res, next) => {
  const banner = await Banner.findById(req.params.id)
  if (banner) {
    // Deleting Images From Cloudinary
    await cloudinary.v2.uploader.destroy(banner.image.public_id);
    await banner.remove();
    res.status(200).json({
      success: true,
      message: "Product deleted"
    })
  }
  else{
    return next(new ErrorHandler("Banner not found", 404));
  }
})
