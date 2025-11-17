const { findproviderService } = require("../Service/providerService");
const { createaccountBusiness } = require("../Business/providerBusiness");
const { METHODS, STATUS } = require("../../utils/constants");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Logger = require("../../utils/logger");
const { apiResponse } = require("../../utils/apiResponse");
const { findUserService } = require("../Service/userService");
const { findAccountService } = require("../Service/accountService");
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const generatelogintoken = async (credentials) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO} || ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.PROVIDER.GENERATE_LOGIN_TOKEN}`
  );
  try {
    const { username, password } = credentials;
    logger.debug(`username and password || ${username},${password}`);
    let providerDetails = await findproviderService({
      $or: [{ username: username }, { email: username }],
    });
    logger.debug(`providerDetails || ${JSON.stringify(providerDetails)}`);
    if (!providerDetails) {
      return apiResponse(STATUS.NOT_FOUND, "No provider found");
    }
    if (password != providerDetails.password) {
      return apiResponse(STATUS.BAD_REQUEST, "password doesnt match");
    }
    const token = jwt.sign(
      {
        _id: providerDetails._id,
        email: providerDetails.email,
        role: providerDetails.role,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    return apiResponse(STATUS.SUCCESS, "", "", { providerDetails, token });
  } catch (error) {
    logger.debug(` login failed || ${JSON.stringify(error)}`);
  }
};

const generateUserlogintoken = async (credentials) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}||  ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.GENERATE_LOGIN_TOKEN}`
  );
  try {
    const { username, password } = credentials;
    logger.debug(`username and password || ${username},${password}`);
    let userdetail = await findUserService({
      $or: [{ userName: username }, { email: username }],
    });
    logger.debug(`userdetails || ${JSON.stringify(userdetail)}`);
    if (!userdetail) {
      return apiResponse(STATUS.NOT_FOUND, "No user found");
    }
    if (password != userdetail.password) {
      return apiResponse(STATUS.BAD_REQUEST, "password doesnt match");
    }

    let accountDetails = await findAccountService({ _id: userdetail.accountId});
    console.log("till here", accountDetails);
    if (!accountDetails) {
      return apiResponse(
        STATUS.BAD_REQUEST,
        "user not verified or account not found"
      );
    }
    const token = jwt.sign(
      {
        _id: userdetail._id,
        email: userdetail.email,
        role: userdetail.role,
      },
      SECRET_KEY,
      { expiresIn: "24h" }
    );
    return apiResponse(STATUS.SUCCESS, "", "", {
      userdetail,
      accountDetails,
      token,
    });
  } catch (error) {
    logger.debug(` login failed || ${JSON.stringify(error)}`);
  }
};

const generateemailverify = async (payload) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}||  ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.PROVIDER.GENERATE_LOGIN_TOKEN}`
  );
  try {
    const { username, email, email_token, role } = payload;
    logger.debug(`username and password || ${username},${email}`);
    let userdetail = await findUserService({
      $or: [{ userName: username }, { email: username }],
    });
    logger.debug(`userdetails || ${JSON.stringify(userdetail)}`);
    if (!userdetail) {
      return apiResponse(STATUS.NOT_FOUND, "No user found");
    }
    const token = jwt.sign(
      {
        _id: userdetail._id,
        email: userdetail.email,
        email_token: userdetail.email_token,
        role: userdetail.role,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    console.log("the email verification token :", token);
    emailverified(token);
    return token;
  } catch (error) {
    logger.debug(` login failed || ${JSON.stringify(error)}`);
  }
};

const emailverified = async (payload) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}||  ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.PROVIDER.CREATE_ACCOUNT}`
  );
  try {
    let verification = jwt.verify(payload, SECRET_KEY);
    const { role, email, username, email_token } = verification;
    if (role == "provider") {
      const userdetail = await findproviderService({ username });

      if (userdetail && email_token === userdetail.email_token) {
        payload = {
          username: username,
          email: email,
          role: role,
        };
        createaccountBusiness(payload);
      } else {
        return "error in email verification";
      }
    }
    console.log(verification);
    createaccountBusiness;
    return verification;
  } catch (error) {}
};

module.exports = {
  generatelogintoken,
  generateUserlogintoken,
  generateemailverify,
  emailverified,
};
