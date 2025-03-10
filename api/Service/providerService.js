const { useremployeeSchema } = require("../../Schema/users");
const dbConnect = require("../../utils/connectionSetup");
const mongoose = require("mongoose");

const findproviderService = async (condition, dbURL = "Faster") => {
  try {
    const conn = await dbConnect(dbURL);
    console.log("the josn ==", JSON.stringify(condition));
    if (condition.$or) {
      condition.$or = condition.$or.filter(
        (item) => item !== null && item !== undefined
      );
      if (condition.$or.length == 0) {
        throw new Error(
          "Invalid $or condition: array cannot be empty or contain only null/undefined values"
        );
      }
    }
    const useremployeedetail = await conn
      .model("Providers", useremployeeSchema, "Providers")
      .findOne(condition);
    // console.log(useremployeedetail)
    return useremployeedetail;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createproviderservice = async (Data, dbURL = "Faster") => {
  try {
    const conn = await dbConnect(dbURL);
    console.log('createservice=',JSON.stringify(Data));
    const useremployeedetail = await conn
      .model("Providers", useremployeeSchema, "Providers")
      .create(Data);
    console.log('Service data=',Data)
    return useremployeedetail;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteproviderservice = async (Data, dbURL = "Faster") => {
  try {
    const conn = await dbConnect(dbURL);
    console.log(JSON.stringify(Data));
    const providerdetails = await conn
      .model("Providers", useremployeeSchema, "Providers")
      .deleteOne(Data);
    return providerdetails;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateproviderservice = async (Data, condition, dbURL = "Faster") => {
  try {
    const conn = await dbConnect(dbURL);
    const useremployeedetail = await conn
      .model("Providers", useremployeeSchema, "Providers")
      .findOneAndUpdate(condition, { $set: Data }, { new: true });
    return useremployeedetail;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  findproviderService,
  createproviderservice,
  deleteproviderservice,
  updateproviderservice,
};
