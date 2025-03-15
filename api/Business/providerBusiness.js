const {
  findproviderService,
  createproviderservice,
  deleteproviderservice,
  updateproviderservice,
} = require("../Service/providerService");

const Logger = require("../../utils/logger");
const { METHODS } = require("../../utils/constants");

const createproviderBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.CREATE_USER}`
  );
  try {
    let { username, password, email } = payload;
    const dbpayload = {
      ...payload,
    };
    logger.debug(`createbuss dbPayload || ${JSON.stringify(dbpayload)}`);
    //console.log("createbusinesspayload=", dbpayload);
    const getprovider = await findproviderService({
      $or: [{ username }, { email }],
    });
    logger.debug(`createbus_getprovider || ${JSON.stringify(getprovider)}`);
    if (getprovider) {
      return getprovider.username === username
        ? "Username already exists in provider"
        : "Email already exists in provider";
    }
    const userDetails = await createproviderservice(dbpayload);
    logger.debug(`userDetail || ${JSON.stringify(userDetails)}`);
    return `${userDetails['email']} Account got successfully`;
  } catch (error) {
    logger.debug(`createbus_error || ${JSON.stringify(error)}`);
  }
};

const getproviderBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.GET_USER}`
  );
  try {
    let { username, email } = payload;
    const condition = {
      $or: [{ username }, { email }],
    };
    logger.debug(`getbus_condition || ${JSON.stringify(condition)}`);
    const getprovider = await findproviderService(condition);
    return getprovider;
  } catch (error) {
    logger.debug(`getbus_error || ${JSON.stringify(error)}`);
  }
};

const deleteproviderBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.DELETE_USER}`
  );
  try {
    //let { username, email } = payload;
    const dbPayload = {
      ...payload,
    };
    logger.debug(`deletebus_payload || ${JSON.stringify(dbPayload)}`);
    // const deleteprovider=await findproviderService({
    //     $or:[(username),{email}],
    // });
    const providerdetails = await deleteproviderservice(dbPayload);
    logger.debug(`deletebus_providedetail || ${JSON.stringify(providerdetails)}`);
    return providerdetails;
  } catch (error) {
    logger.debug(`deletebus_error || ${JSON.stringify(error)}`);
  }
};
const updateproviderBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.UPDATE_USER}`
  );
  try {
    let { email } = query;
    const dbpayload = {
      ...payload,
    };
    logger.debug(`updatebus_payload || ${JSON.stringify(payload)}`);
    const condition = {
      email: email,
    };
    const providerdetails = await updateproviderservice(condition, dbpayload);
    logger.debug(`updatebus_providedetail || ${JSON.stringify(providerdetails)}`);
    return providerdetails;
  } catch (error) {
    logger.debug(`updatebus_error || ${JSON.stringify(error)}`);
  }
};

module.exports = {
  createproviderBusiness,
  getproviderBusiness,
  deleteproviderBusiness,
  updateproviderBusiness,
};
