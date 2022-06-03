const mongoose=require('mongoose');

const BannerSchema=new mongoose.Schema({
    image:{
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
    },
    link:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("Banner",BannerSchema);
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