const { METHODS } = require("../../utils/constants");
const Logger = require("../../utils/logger");
const { response } = require("../../utils/response");
const { generatelogintoken,emailverifiation,email_verify_generate_token } = require("../Business/logintokenBusiness");
const { verifyUserEmailBusiness,generateemailtoken } = require("../Business/verifyEmailBusiness");
const {
  createproviderBusiness,
  getproviderBusiness,
  deleteproviderBusiness,
  updateproviderBusiness,
} = require("../Business/providerBusiness");

const createprovidercontroller = async (req, res) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.CONTROLLER_METHOD} || ${METHODS.MODULES.USER.GET_USER}`
  );
  logger.debug(` req.body || ${req.body}`);
  try {
    const resp = await createproviderBusiness(req.body, req.query);
    return res.status(resp.status).json(await response(resp));
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.error("Error in create provider controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getprovidercontroller = async (req, res) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.CONTROLLER_METHOD} || ${METHODS.MODULES.USER.GET_USER}`
  );
  logger.debug(
    ` body || ${JSON.stringify(req.body)} || query || ${JSON.stringify(
      req.query
    )}`
  );
  try {
    const resp = await getproviderBusiness(req.query, req.query);
    generateemailtoken('resp');
    // emailverifiation("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdXJwb3NlIjoiZW1haWx2ZXJpZmljYXRpb24iLCJpYXQiOjE3NDUyMjYxMjUsImV4cCI6MTc0NTMxMjUyNX0.cML9qn1nFp1HpS6nZNCallp4PVDby2k9Qu3H2XH8bXk")
    return res.status(resp.status).json(await response(resp));
  } catch (error) {
    console.error("Error in get provider controller:", error);
    logger.debug(`error || ${JSON.stringify(error)}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteprovidercontroller = async (req, res) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.CONTROLLER_METHOD} || ${METHODS.MODULES.USER.DELETE_USER}`
  );
  logger.debug(
    ` body || ${JSON.stringify(req.body)} || query || ${JSON.stringify(
      req.query
    )}`
  );
  try {
    const resp = await deleteproviderBusiness(req.query);
    console.log("resp==", resp);
    return res.status(200).json({
      success: true,
      data: resp,
    });
  } catch (error) {
    console.error("Error in delete provider controller", error);
    logger.debug(`error || ${JSON.stringify(error)}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateprovidercontroller = async (req, res) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.CONTROLLER_METHOD} || ${METHODS.MODULES.USER.UPDATE_USER}`
  );
  logger.debug(
    ` body || ${JSON.stringify(req.body)} || query || ${JSON.stringify(
      req.query
    )}`
  );
  try {
    const resp = await updateproviderBusiness(req.body, req.query);
    return res.status(200).json({
      success: true,
      data: resp,
    });
  } catch (error) {
    console.error("Error in delete provider controller", error);
    logger.debug(`error || ${JSON.stringify(error)}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const generateProviderLoginTokenController = async (req, res) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.CONTROLLER_METHOD} || ${METHODS.MODULES.USER.GET_USER}`
  );
  logger.debug(
    ` body || ${JSON.stringify(req.body)} || query || ${JSON.stringify(
      req.query
    )}`
  );
  try {
    const resp = await generatelogintoken(req.body);
    return res.status(resp.status).json(await response(resp));
  } catch (error) {
    console.error("Error in getUserDetailsController:", error);
    logger.debug(`error || ${JSON.stringify(error)}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createprovidercontroller,
  getprovidercontroller,
  deleteprovidercontroller,
  updateprovidercontroller,
  generateProviderLoginTokenController,
};
