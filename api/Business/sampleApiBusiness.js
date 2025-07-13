const { apiResponse } = require("../../utils/apiResponse");
const { METHODS, STATUS } = require("../../utils/constants");
const Logger = require("../../utils/logger");

const sampleBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.CREATE_USER}`
  );
  logger.debug(` payload || ${JSON.stringify(payload)}`);
  try {
    let {  } = payload;
    let condition = {
    };
    let workflow = await sampleService(condition, payload );
    console.log()
    return apiResponse(STATUS.SUCCESS, "", "created successfully");
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.log(error);
  }
};

module.exports = {
  sampleBusiness,
};
