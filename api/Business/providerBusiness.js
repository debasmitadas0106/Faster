const { apiResponse } = require("../../utils/apiResponse");
const { METHODS, STATUS } = require("../../utils/constants");
const Logger = require("../../utils/logger");
// const { generateemailverify } = require("../Business/logintokenBusiness");

// const { generatelogintoken } = require("../Business/logintokenBusiness");

const {
  findproviderService,
  createproviderservice,
  deleteproviderservice,
  updateproviderservice,
  createaccountservice,
} = require("../Service/providerService");
const { v4: uuidv4 } = require("uuid");

const createproviderBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.CREATE_USER}`
  );
  logger.debug(` payload || ${JSON.stringify(payload)}`);
  try {
    let { userName, password, email } = payload;
    const dbpayload = {
      ...payload,
      role: "provider",

      token: uuidv4(),
      active: true,
    };
    logger.debug(`dbPayload || ${JSON.stringify(dbpayload)}`);
    const getprovider = await findproviderService({
      $or: [{ userName }, { email }],
    });
    logger.debug(`getprovider || ${JSON.stringify(getprovider)}`);
    if (getprovider) {
      return apiResponse(
        STATUS.BAD_REQUEST,
        getprovider.userName === userName
          ? "Username already exists"
          : "Email already exists",
        "",
        ""
      );
    }
    const userDetails = await createproviderservice(dbpayload);
    // await generateemailverify(userDetails);
    logger.debug(`createuserDetails || ${JSON.stringify(userDetails)}`);
    return apiResponse(
      STATUS.SUCCESS,
      "",
      "user created successfully",
      userDetails
    );
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.log(error);
  }
};

const getproviderBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.GET_USER}`
  );
  logger.debug(` query in business || ${JSON.stringify(query)}`);
  try {
    // let { username, email } = payload;
    // const condition = {
    //   $or: [{ username }, { email }],
    // };
    let { searchkey } = query;
    logger.debug(`searchkey in query || ${JSON.stringify(searchkey)}`);
    const condition = {
      $or: [{ userName: searchkey }, { email: searchkey }],
    };

    const getprovider = await findproviderService(condition);
    logger.debug(`getprovider || ${JSON.stringify(getprovider)}`);

    if (!getprovider) {
      return apiResponse(STATUS.NOT_FOUND, "User not found");
    }
    return apiResponse(STATUS.SUCCESS, "", "", getprovider);
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.log(error);
  }
};

const deleteproviderBusiness = async (query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.DELETE_USER}`
  );
  logger.debug(` query || ${JSON.stringify(query)}`);
  try {
    let { searchkey } = query;
    logger.debug(` searchkey== || ${JSON.stringify(searchkey)}`);
    let condition = {
      $or: [{ userName: searchkey }, { email: searchkey }],
    };
    logger.debug(`condition == || ${JSON.stringify(condition)}`);
    const providerdetails = await deleteproviderservice(condition);
    logger.debug(`providerDetails || ${JSON.stringify(providerdetails)}`);
    return apiResponse(STATUS.SUCCESS, "", "", providerdetails);
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.log(error);
  }
};

const updateproviderBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.UPDATE_USER}`
  );
  logger.debug(
    ` query || ${JSON.stringify(query)} || payload ||${JSON.stringify(
      payload
    )} `
  );
  try {
    console.log("payload==", payload);
    let { searchKey } = query;
    const dbpayload = {
      ...payload,
    };
    let condition = {
      $or: [{ userName: searchKey }, { email: searchKey }],
    };
    // const condition = {
    //   email: email,
    // };
    const providerdetails = await updateproviderservice(condition, dbpayload);
    logger.debug(`provider details || ${JSON.stringify(providerdetails)}`);
    return apiResponse(STATUS.SUCCESS, "", "", providerdetails);
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.log(error);
  }
};

const createaccountBusiness = async (payload) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.CREATE_USER}`
  );
  logger.debug(` payload || ${JSON.stringify(payload)}`);
  try {
    let { userName, email } = payload;
    const dbpayload = {
      ...payload,
      role: "provider",
      token: uuidv4(),
    };
    logger.debug(`dbPayload || ${JSON.stringify(dbpayload)}`);
    const userDetails = await createaccountservice(dbpayload);
    logger.debug(`createuserDetails || ${JSON.stringify(userDetails)}`);
    return apiResponse(
      STATUS.SUCCESS,
      "",
      "Account created successfully for the provider",
      userDetails
    );
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.log(error);
  }
};

module.exports = {
  createproviderBusiness,
  getproviderBusiness,
  deleteproviderBusiness,
  updateproviderBusiness,
  createaccountBusiness,
};
