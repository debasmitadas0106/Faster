const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

const googleAuthSchema = new Schema(
  {
    email: String,
    accessToken: String,
    refreshToken: String,
    expiryTime: Number,
    scopes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = { googleAuthSchema };
