const { apiResponse } = require("../../utils/apiResponse");
const { METHODS, STATUS } = require("../../utils/constants");
const { generateSHA256 } = require("../../utils/encryption");
const Logger = require("../../utils/logger");
const crypto = require("crypto");
const {
  createUserService,
  findUserService,
  updateUserService,
  deleteUserService,
} = require("../Service/userService");
const { v4: uuidv4 } = require("uuid");
const { sendMail } = require("../../utils/gmail");

const createUserDetailsBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.CREATE_USER}`
  );
  logger.debug(` payload || ${JSON.stringify(payload)}`);
  try {
    let { userName, password, email } = payload;
    password = generateSHA256(password);
    let token = crypto.randomBytes(3).toString("hex").toUpperCase();
    const dbPayload = {
      ...payload,
      password,
      role: "user",
      token,
      active: true,
    };
    logger.debug(`dbPayload || ${JSON.stringify(dbPayload)}`);
    const getUser = await findUserService({
      $or: [{ userName }, { email }],
    });
    logger.debug(`getUser || ${JSON.stringify(getUser)}`);
    if (getUser) {
      return apiResponse(
        STATUS.BAD_REQUEST,
        getUser.userName === userName
          ? "Username already exists"
          : "Email already exists",
        "",
        ""
      );
    }
    const userDetails = await createUserService(dbPayload);

    const emailBody = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="margin-bottom: 10px;">Verify Your Email</h2>
      <p style="margin: 0 0 15px;">
        Hi there! To complete your sign-up, please use the verification code below:
      </p>

      <div style="font-size: 18px; font-weight: bold; letter-spacing: 2px; margin: 20px 0;">
        ${token}
     </div>

      <p style="margin: 0 0 10px;">
        This code is valid for the next <strong>10 minutes</strong>.  
        If you didn’t request this, you can safely ignore this email.
      </p>

       <p style="margin-top: 20px;">— Team Faster</p>
      </div>
    `;

    let emailPayload = {
      to: userDetails.email,
      userEmail: "debasmita.github@gmail.com",
      html: emailBody,
      subject: "Faster - please verify your email address",
    };
    await sendMail(emailPayload);
    logger.debug(`userDetails || ${JSON.stringify(userDetails)}`);
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

const getUserDetailsBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.GET_USER}`
  );
  logger.debug(` query || ${JSON.stringify(query)}`);
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

const updateUserDetailsBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.UPDATE_USER}`
  );
  logger.debug(
    ` query || ${JSON.stringify(query)} || payload ||${JSON.stringify(
      payload
    )} `
  );
  try {
    let { searchKey } = query;
    let dbPayload = { ...payload };
    let condition = {
      $or: [{ userName: searchKey }, { email: searchKey }],
    };
    const userDetails = await updateUserService(condition, dbPayload);
    logger.debug(`userDetails || ${JSON.stringify(userDetails)}`);
    return apiResponse(STATUS.SUCCESS, "", "", userDetails);
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.log(error);
  }
};

const deleteUserDetailsBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.DELETE_USER}`
  );
  logger.debug(` query || ${JSON.stringify(query)}`);
  try {
    let { searchKey } = query;
    let condition = {
      $or: [{ userName: searchKey }, { email: searchKey }],
    };
    const userDetails = await deleteUserService(condition);
    logger.debug(`userDetails || ${JSON.stringify(userDetails)}`);
    return apiResponse(STATUS.SUCCESS, "", "", userDetails);
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.log(error);
  }
};
function generateSecureToken(length = 16) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = crypto.randomBytes(length);
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars[bytes[i] % chars.length];
  }
  return token;
}
module.exports = {
  createUserDetailsBusiness,
  getUserDetailsBusiness,
  updateUserDetailsBusiness,
  deleteUserDetailsBusiness,
};
