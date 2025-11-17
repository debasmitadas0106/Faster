const dbConnect = require("../../utils/connectionSetup");
const mongoose = require("mongoose");
const Logger = require("../../utils/logger");
const { METHODS } = require("../../utils/constants");
const { accountSchema } = require("../../Schema/account");

const createAccountService = async (data, dbUrl = "Faster") => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.SERVICE_METHOD} || ${METHODS.MODULES.USER.CREATE_USER}`
  );
  logger.debug(`data || ${JSON.stringify(data)}`);
  try {
    const conn = await dbConnect(dbUrl);

    const accountDetails = await conn.model(
      "Accounts",
      accountSchema,
      "Accounts"
    );

    const accountDetailsCreate = await accountDetails.create(data);
    return accountDetailsCreate;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const findAccountService = async (condition, dbUrl = "Faster") => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.SERVICE_METHOD} || ${METHODS.MODULES.USER.FIND_USER}`
  );
  logger.debug(`condition || ${JSON.stringify(condition)}`);
  try {
    const conn = await dbConnect(dbUrl);

    const accountDetails = await conn.model(
      "Accounts",
      accountSchema,
      "Accounts"
    );

    const accountDetailsFind = await accountDetails.findOne(condition);
    console.log(accountDetailsFind,"ssssssssssss")
    return accountDetailsFind;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = {
  createAccountService,
  findAccountService,
};
