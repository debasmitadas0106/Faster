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
    email_token: String,
    verified: Boolean,
    password: String,
    role: String,
    userAddress: [Object],
    location: Object,
    lastSeen: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const useremployeeSchema = new Schema(
  {
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    personalphnumber: String,
    password: String,
    personaladdress: String,
    workphnumber: String,
    workaddress: String,
    StarRating: Number,
    role: String,
    email_token: String,
    active: Boolean,
    lastSeen: String,
  },
  {
    timestamps: true,
  }
);

module.exports = { userSchema, useremployeeSchema };
