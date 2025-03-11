const { useremployeeSchema } = require("../../Schema/users");
const dbConnect = require("../../utils/connectionSetup");
const mongoose = require("mongoose");

const findproviderService = async (condition, dbURL = "Faster") => {
  try {
    const conn = await dbConnect(dbURL);
    const useremployeedetail = await conn
      .model("Providers", useremployeeSchema, "Providers")
      .findOne(condition);
    if (useremployeedetail == null || useremployeedetail == undefined) {
      const statusCode = 404;
      return { useremployeedetail: null, statusCode: statusCode };
    }
    return useremployeedetail;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createproviderservice = async (data, dbURL = "Faster") => {
  try {
    const conn = await dbConnect(dbURL);
    const existingUser = await conn
      .model("Providers", useremployeeSchema, "Providers")
      .findOne({ email: data["email"] });

    if (existingUser) {
      return { statusCode: 400, email: data["email"] };
    }
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

    const providerdetails = await conn
      .model("Providers", useremployeeSchema, "Providers")
      .deleteOne(Data);
    return providerdetails;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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
