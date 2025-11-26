const { apiResponse } = require("../../utils/apiResponse");
const { METHODS, STATUS } = require("../../utils/constants");
const { oauth2Client } = require("../../utils/gmail");
const Logger = require("../../utils/logger");
const { createGoogleAuthService } = require("../Service/googleAuthService");

const googleAuthCallbackBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.GMAIL.CREATE_GOOGLE_AUTH}`
  );
  logger.debug(` payload || ${JSON.stringify(payload)}`);
  try {
    let { code } = query;
    let googleAuthPayload = {};
    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      googleAuthPayload = {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiryTime: tokens.expiry_date,
      };
    } catch (err) {
      console.error("Error getting tokens:", err);
    }
    await createGoogleAuthService(googleAuthPayload);
    return apiResponse(
      STATUS.SUCCESS,
      "",
      "google auth tokens added successfully"
    );
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.log(error);
  }
};

module.exports = {
  googleAuthCallbackBusiness,
};
