const app=require('./app');
const cloudinary=require('cloudinary');
const connectDatabase=require("./config/database")
//Handling Unchought Exceptino
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shuting down the server`);
    server.close(()=>{
        process.exit(1);
    });
})
//Config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({path:"backend/config/.env"})
}
//Connecting to database
connectDatabase();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on https://localhost${process.env.PORT}`)
})
//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shuting down the server`);
    server.close(()=>{
        process.exit(1);
    });
})