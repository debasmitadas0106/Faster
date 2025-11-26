const { METHODS } = require("../../utils/constants");
const Logger = require("../../utils/logger");
const { response } = require("../../utils/response");
const { googleAuthCallbackBusiness } = require("../Business/gmailAuthBusiness");

const googleAuthCallbackController = async (req, res) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.CONTROLLER_METHOD} || ${METHODS.MODULES.USER.GET_USER}`
  );
  logger.debug(` req.body || ${req.body}`);
  try {
    const resp = await googleAuthCallbackBusiness(req.body, req.query);
    return res.status(resp.status).json(await response(resp));
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.error("Error in createEmployeeDetailsController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  googleAuthCallbackController,
};
