const { useremployeeSchema } = require("../../Schema/users");
const { AccountSchema } = require("../../Schema/account");
const dbConnect = require("../../utils/connectionSetup");
const mongoose = require("mongoose");
const { METHODS } = require("../../utils/constants");
const Logger = require("../../utils/logger");

const findproviderService = async (condition, attribute, dbURL = "Faster") => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.SERVICE_METHOD} || ${METHODS.MODULES.USER.FIND_USER}`
  );
  logger.debug(`condition || ${JSON.stringify(condition)}`);
  try {
    const conn = await dbConnect(dbURL);
    // logger.debug(`condition || ${JSON.stringify(condition)}`);
    const useremployeedetail = await conn
      .model("Providers", useremployeeSchema, "Providers")
      .findOne(condition)
      .select(attribute);
    // logger.debug(`useremployeedetails of${JSON.stringify(condition)} ==${useremployeedetail}`)
    return useremployeedetail;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createproviderservice = async (data, dbURL = "Faster") => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.SERVICE_METHOD} || ${METHODS.MODULES.USER.CREATE_USER}`
  );
  logger.debug(`data || ${JSON.stringify(data)}`);
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
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.SERVICE_METHOD} || ${METHODS.MODULES.USER.DELETE_USER}`
  );
  logger.debug(`Data || ${JSON.stringify(Data)}}`);
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
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.SERVICE_METHOD} || ${METHODS.MODULES.USER.UPDATE_USER}`
  );
  logger.debug(
    `condition || ${JSON.stringify(condition)} || data || ${JSON.stringify(
      data
    )}`
  );
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

const createaccountservice=async (payload,dbURL="Faster")=>{
  try{
    const conn=await dbConnect(dbURL);
    const createaccount=await conn.model("Account",AccountSchema,"Account");
    const createemployeeaccount=await createaccount.create(payload);
    return createemployeeaccount;
  }catch(error){
    throw error;
  }
}

module.exports = {
  findproviderService,
  createproviderservice,
  deleteproviderservice,
  updateproviderservice,
  createaccountservice
};
