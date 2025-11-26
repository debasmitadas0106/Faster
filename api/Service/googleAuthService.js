const dbConnect = require("../../utils/connectionSetup");
const mongoose = require("mongoose");
const Logger = require("../../utils/logger");
const { METHODS } = require("../../utils/constants");
const { googleAuthSchema } = require("../../Schema/googleAuth");

const createGoogleAuthService = async (data, dbUrl = "Faster") => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.SERVICE_METHOD} || ${METHODS.MODULES.GMAIL.CREATE_GOOGLE_AUTH}`
  );
  logger.debug(`data || ${JSON.stringify(data)}`);
  try {
    const conn = await dbConnect(dbUrl);

    const googleAuthDetails = await conn.model(
      "GoogleAuth",
      googleAuthSchema,
      "GoogleAuth"
    );

    const googleAuthDetailsCreate = await googleAuthDetails.create(data);
    return googleAuthDetailsCreate;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getGoogleAuthService = async (condition, dbUrl = "Faster") => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.SERVICE_METHOD} || ${METHODS.MODULES.GMAIL.FIND_GOOGLE_AUTH}`
  );
  logger.debug(`condition || ${JSON.stringify(condition)}`);
  try {
    const conn = await dbConnect(dbUrl);

    const googleAuthDetails = await conn.model(
      "GoogleAuth",
      googleAuthSchema,
      "GoogleAuth"
    );

    const googleAuthDetailsFind = await googleAuthDetails.findOne(condition);
    return googleAuthDetailsFind;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const updateGoogleAuthService = async (condition, data, dbUrl = "Faster") => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.SERVICE_METHOD} || ${METHODS.MODULES.GMAIL.UPDATE_GOOGLE_AUTH}`
  );
  logger.debug(
    `data || ${JSON.stringify(data)} || condition || ${JSON.stringify(
      condition
    )}`
  );
  try {
    const conn = await dbConnect(dbUrl);

    const googleAuthDetails = await conn.model(
      "GoogleAuth",
      googleAuthSchema,
      "GoogleAuth"
    );

    const googleAuthDetailsUpdate = await googleAuthDetails.updateOne(
      condition,
      data
    );
    return googleAuthDetailsUpdate;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createGoogleAuthService,
  getGoogleAuthService,
  updateGoogleAuthService,
};
