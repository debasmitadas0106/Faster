const { apiResponse } = require("../../utils/apiResponse");
const { METHODS, STATUS } = require("../../utils/constants");
const { generateSHA256 } = require("../../utils/encryption");
const Logger = require("../../utils/logger");
const { createAccountService } = require("../Service/accountService");
const {
  findUserService,
  updateUserService,
  createUserService,
} = require("../Service/userService");
const { updateUserDetailsBusiness } = require("./userBusiness");

const verifyUserEmailBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.EMAIL.VERIFY_EMAIL}`
  );
  logger.debug(` payload || ${JSON.stringify(payload)}`);
  try {
    let { token } = payload;
    const userDetails = await findUserService({ token: token });
    if (!userDetails) {
      return apiResponse(
        STATUS.NOT_FOUND,
        "User doesnt exist or token is invalid"
      );
    }
    const dbName = `Faster_user_${userDetails._id}`;
    let accountPayload = {
      userName: userDetails.userName,
      userId: userDetails._id,
      accountName: userDetails.firstName,
      fasterCoins: 10,
      email: userDetails.email,
    };
    const accountDetails = await createAccountService(accountPayload);
    const data = {
      token: "",
      $push: {
        accountId: accountDetails._id,
      },
    };
    await updateUserService({ email: userDetails.email }, data);
    const userDBpayload = {
      userName: userDetails.userName,
      access: "admin",
      userId: userDetails._id,
      lastSeen: new Date().toISOString(),
    };
    await createUserService(userDBpayload, dbName);
    return apiResponse(
      STATUS.SUCCESS,
      "",
      "email verified and account created successfully"
    );
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.log(error);
  }
};

const verifyProviderEmailBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.EMAIL.VERIFY_EMAIL}`
  );
  logger.debug(` payload || ${JSON.stringify(payload)}`);
  try {
    let { token } = payload;
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.log(error);
  }
};

module.exports = {
  verifyUserEmailBusiness,
  verifyProviderEmailBusiness,
};
