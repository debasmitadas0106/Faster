const {userSchema} = require("../../Schema/users");
const dbConnect = require("../../utils/connectionSetup");
const mongoose = require("mongoose");

const findUserService = async (condition, dbUrl = "Faster") => {
  try {
    const conn = await dbConnect(dbUrl);

    const userDetails = await conn.model("users", userSchema, "users");
    console.log(JSON.stringify(condition));

    const userDetailsFind = await userDetails.findOne(condition);
    return userDetailsFind;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createUserService = async (data, dbUrl = "Faster") => {
  try {
    const conn = await dbConnect(dbUrl);

    const userDetails = await conn.model("users", userSchema, "users");

    const userDetailsCreate = await userDetails.create(data);
    return userDetailsCreate;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { findUserService, createUserService };
