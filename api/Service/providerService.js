const { useremployeeSchema } = require("../../Schema/users");
const dbConnect = require("../../utils/connectionSetup");
const mongoose = require("mongoose");
const Logger = require("../../utils/logger");
const { METHODS } = require("../../utils/constants");


const findproviderService = async (condition, dbURL = "Faster") => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.SERVICE_METHOD} || ${METHODS.MODULES.USER.FIND_USER}`
  );
  try {
    const conn = await dbConnect(dbURL);
    const useremployeedetail = await conn
      .model("Providers", useremployeeSchema, "Providers")
      .findOne(condition);
    logger.debug(`findservice_employeedetail || ${JSON.stringify(useremployeedetail)}`)
    return useremployeedetail;
  } catch (error) {
    logger.debug(`findservice_error|| ${JSON.stringify(error)}`);
    throw error;
  }
};

const createproviderservice = async (data, dbURL = "Faster") => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.SERVICE_METHOD} || ${METHODS.MODULES.USER.CREATE_USER}`
  );
  try {
    const conn = await dbConnect(dbURL);
    const useremployeedetail = await conn
      .model("Providers", useremployeeSchema, "Providers")
      .create(data);
    logger.debug(`createemploye_providedetail || ${JSON.stringify(useremployeedetail)}`);
    return useremployeedetail;
  } catch (error) {
    logger.debug(`createservice_error || ${JSON.stringify(error)}`);
    throw error;
  }
};

const deleteproviderservice = async (Data, dbURL = "Faster") => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.DELETE_USER}`
  );
  try {
    const conn = await dbConnect(dbURL);
    //console.log(JSON.stringify(Data));
    const providerdetails = await conn
      .model("Providers", useremployeeSchema, "Providers")
      .deleteOne(Data);
    logger.debug(`deleteserv_providerdetaail|| ${JSON.stringify(providerdetails)}`)
    return providerdetails;
  } catch (error) {
    logger.debug(`deleteservice_error || ${JSON.stringify(error)}`)
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
    logger.debug(`updateservice_employee || ${JSON.stringify(employeeDetailsUpdate)}`)
    return employeeDetailsUpdate;
  } catch (error) {
    logger.debug(`updateservice_error || ${JSON.stringify(error)}`)
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
