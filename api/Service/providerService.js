const { useremployeeSchema } = require("../../Schema/users");
const dbConnect = require("../../utils/connectionSetup");
const mongoose = require("mongoose");

const findproviderService = async (condition, dbURL = "Faster") => {
  try {
    const conn = await dbConnect(dbURL);
    const useremployeedetail = await conn
      .model("Providers", useremployeeSchema, "Providers")
      .findOne(condition);
    return useremployeedetail;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createproviderservice = async (data, dbURL = "Faster") => {
  try {
    const conn = await dbConnect(dbURL);
    const useremployeedetail = await conn
      .model("Providers", useremployeeSchema, "Providers")
      .create(data);
    return useremployeedetail;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteproviderservice = async (Data, dbURL = "Faster") => {
  try {
    const conn = await dbConnect(dbURL);
    //console.log(JSON.stringify(Data));
    const providerdetails = await conn
      .model("Providers", useremployeeSchema, "Providers")
      .deleteOne(Data);
    return providerdetails;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// const updateproviderservice = async (Data, condition, dbURL = "Faster") => {
//   try {
//     const conn = await dbConnect(dbURL);
//     const useremployeedetail = await conn
//       .model("Providers", useremployeeSchema, "Providers")
//       .findOneAndUpdate(condition, { $set: Data }, { new: true });
//     return useremployeedetail;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

const updateproviderservice = async (condition, data, dbUrl = "Faster") => {
  try {
    const conn = await dbConnect(dbUrl);

    const employeeDetails = await conn.model(
      "Providers",
      useremployeeSchema,
      "Providers"
    );

    const employeeDetailsUpdate = await employeeDetails.updateOne(
      condition,
      data
    );
    return employeeDetailsUpdate;
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
