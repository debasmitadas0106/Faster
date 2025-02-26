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

module.exports = userSchema;
