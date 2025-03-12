const { apiResponse } = require("../../utils/apiResponse");
const { METHODS, STATUS } = require("../../utils/constants");
const { generateSHA256 } = require("../../utils/encryption");
const Logger = require("../../utils/logger");
const {
  createUserService,
  findUserService,
} = require("../Service/userService");

const createUserDetailsBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.CREATE_USER}`
  );
  try {
    let { userName, password, email } = payload;
    password = generateSHA256(password);

    const dbPayload = {
      ...payload,
    };
    logger.debug(`dbPayload || ${JSON.stringify(dbPayload)}`);
    const getUser = await findUserService({
      $or: [{ userName }, { email }],
    });
    logger.debug(`getUser || ${JSON.stringify(getUser)}`);
    if (getUser) {
      return getUser.userName === userName
        ? "Username already exists"
        : "Email already exists";
    }
    const userDetails = await createUserService(dbPayload);
    logger.debug(`userDetails || ${JSON.stringify(userDetails)}`);
    return apiResponse(STATUS.SUCCESS, "", "user created successfully", userDetails);
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.log(error);
  }
};

const getUserDetailsBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.CREATE_USER}`
  );
  try {
    let { searchKey } = query;
    logger.debug(`query || ${JSON.stringify(query)}`);
    const userDetails = await findUserService({
      $or: [{ userName: searchKey }, { email: searchKey }],
    });
    logger.debug(`userDetails || ${JSON.stringify(userDetails)}`);
    if (!userDetails) {
      return apiResponse(STATUS.NOT_FOUND, "User not found");
    }
    return apiResponse(STATUS.SUCCESS, "", "", userDetails);
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.log(error);
  }
};

module.exports = { createUserDetailsBusiness, getUserDetailsBusiness };
