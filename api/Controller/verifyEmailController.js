const { METHODS } = require("../../utils/constants");
const Logger = require("../../utils/logger");
const { response } = require("../../utils/response");
const { generateUserlogintoken } = require("../Business/logintokenBusiness");
const { createUserDetailsBusiness } = require("../Business/userBusiness");
const { verifyUserEmailBusiness,generateemailtoken, verifyProviderEmailBusiness } = require("../Business/verifyEmailBusiness");

const verifyUserEmailController = async (req, res) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.CONTROLLER_METHOD} || ${METHODS.MODULES.EMAIL.VERIFY_USER_EMAIL}`
  );
  logger.debug(` req.body || ${req.body}`);
  try {
    const resp = await verifyUserEmailBusiness(req.body, req.query);
    return res.status(resp.status).json(await response(resp));
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.error("Error in verifyEmailController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const verifyProviderEmailController = async (req, res) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.CONTROLLER_METHOD} || ${METHODS.MODULES.EMAIL.VERIFY_USER_EMAIL}`
  );
  logger.debug(` req.body || ${req.body}`);
  try {
    const resp = await verifyProviderEmailBusiness(req.body, req.user);
    return res.status(resp.status).json(await response(resp));
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.error("Error in verifyEmailController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  verifyUserEmailController,
  verifyProviderEmailController,
};
