const mongoose = require("mongoose");
const { encodeBase64 } = require("../utils/encryption");

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

const accountSchema = new Schema(
  {
    userName: String,
    userId: ObjectId,
    accountName: String,
    fasterCoins: Number,
    email: String,
    role: String,
    providerId: ObjectId,
  },
  {
    timestamps: true,
  }
);

module.exports = { accountSchema };
