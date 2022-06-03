const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const errorMiddleware=require('./middleware/error')
const bodyParser=require('body-parser');
const fileUpload=require('express-fileupload');
const path=require('path')
//Config

if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({path:"backend/config/.env"})
}



app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
//Routes Import
const product=require('./routes/productRoutes');
const user=require('./routes/userRoutes');
const order=require('./routes/orderRoute');
const payment=require('./routes/paymentRoute');
const banner=require('./routes/bannerRoutes');

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use('/api/v1',order);
app.use('/api/v1',payment);
app.use('/api/v1/',banner);

app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})

//Middleware for Errors

app.use(errorMiddleware);
module.exports=app