const mongoose=require('mongoose');

const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter Product name'],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter Product description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter Product Price"],
        maxLength:[10,"Price cannot exceed 10 character"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter Product Category"]
    },
    Stock:{
        type:Number,
        required:[true,"Please enter Product Stock"],
        maxLength:[5,"Stock cannot exceed 5 character"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("Product",ProductSchema);
/*
{
    "name":"Shirt",
    "description":"Nice Shirt",
    "price":1500,
    "ratings":2,
    "images":[
        {
             "public_id": "Sample Image",
             "url": "Sample Url"
        }
    ],
    "category":"Dresses",
    "Stock": 1,
    "numOfReviews": 0
}
*/