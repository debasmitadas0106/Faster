const mongoose = require("mongoose");
const { encodeBase64 } = require("../utils/encryption");

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

const userSchema = new Schema(
  {
    userName: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
    userAddress: [Object],
    location: Object,
    lastSeen: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const useremployeeSchema=new Schema(
  {
    username:String,
    firstName:String,
    lastName:String,
    email:String,
    personalphnumber:String,
    password:String,
    personaladdress:String,
    workphnumber:String,
    workaddress:String,
    StarRating:Number,
    active:Boolean,
  },
  {
    timestamps:true
  }
);

module.exports = {userSchema,useremployeeSchema};
