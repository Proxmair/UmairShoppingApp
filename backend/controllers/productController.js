const Product = require("../models/productModel");
const User = require('../models/userModel');
const ErrorHandler = require("../utils/errorHandler");
const AsyncErrors = require("../middleware/asyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require('cloudinary');

//Create Product ..For Admin
exports.createProduct = AsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
})
//Get All Products ..For Users

exports.getAllProduct = AsyncErrors(async (req, res, next) => {
  const keyword=req.query.keyword?{
    name:{
        $regex:req.query.keyword,
        $options:"i",
    }
  }:
  {
    name:{
      $regex:"",
      $options:"i",
    }
  };
  const queryCopy={...req.query};
  //Removing some field for category
  const removeFields=["keyword","page","limit"];
  removeFields.forEach(key=>delete queryCopy[key]);
  //Filter for price and Rating
  let queryStr=JSON.stringify(queryCopy);
  queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
  queryStr=JSON.parse(queryStr);
  queryStr.name=keyword.name;
  const resultPerPage = 8;
  const productCount = await Product.countDocuments(queryStr);
  const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage) ;
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
  })
  /**/
})
//Get All Products ..For Admin

exports.getAdminProduct = AsyncErrors(async (req, res, next) => {
  const products = await Product.find()
  res.status(200).json({
    success: true,
    products,
  })
})
//Update Product ..For Admin
exports.updateProduct = AsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
})
//Delete Product ..For Admin
exports.deleteProduct = AsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product deleted"
    })
  }

  else {
    return next(new ErrorHandler("Product not found", 404));
  }
})
//Get Product Details ..For User
exports.getProductDetails = AsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json({
      success: true,
      product,
    })
  }
  else {
    return next(new ErrorHandler("Product not found", 404));
  }
})
//Create New Review or UPdate the Review
exports.createProductReview = AsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });

})
// Get All Reviews of a product
exports.getProductReviews = AsyncErrors(async (req, res, next) => {
  console.log(req.query.id)
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = AsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  console.log(product);
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});