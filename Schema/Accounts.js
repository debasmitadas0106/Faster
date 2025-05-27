const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const AccountSchema=new Schema(
    {
        username:String,
        email:String,
        role:String,
        totalbookings: Number,
        amountspend: Number
},{
    timestamps:true,
})
module.exports={AccountSchema};