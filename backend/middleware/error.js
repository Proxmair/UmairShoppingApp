const ErrorHandler=require('../utils/errorHandler');

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message||"Internal Server Error";
    //Invalid MongoDb id error
    if(err.name==="CastError"){
        const message=`Resource not found Invalid ${err.path}`;
        err=new ErrorHandler(message,400);
    }
    //Mongoose Dulicate key error
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered `;
        err=new ErrorHandler(message,400);
    }
    //Wrong JWT error
    if(err.name==="JsonWebTokenError"){
        const message=`Your Web Token is invalid`;
        err=new ErrorHandler(message,400);
    }
    //JWT Expire Error
    if(err.name==="TokenExpiredError"){
        const message=`Your Web Token is expired`;
        err=new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
    
}