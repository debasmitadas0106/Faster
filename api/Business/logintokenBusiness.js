const { findproviderService } = require("../Service/providerService");
const { METHODS, STATUS } = require("../../utils/constants");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Logger = require("../../utils/logger");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const generatelogintoken1 = async (username, password) => {
  let userdetail = findproviderService(username);
  if (userdetail && password == userdetail.password) {
    payload = {
      user_id: userdetail._id,
      username: userdetail.username,
      role: userdetail.role,
    };
    console.log("payload", payload);
    token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1hr" });
    return token;
  } else {
    return "username or password is wrong";
  }
};

const generatelogintoken = async (payload) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.CREATE_USER}`
  );
  logger.debug(` query || ${JSON.stringify(query)}`);
  try {
    let { username, password } = payload;
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
module.exports = { generatelogintoken };
let payload = {
  userName: "debasmita",
  password: "86ruahfjkds",
};
let userDetails = {
  userId: "75623fj",
  name: "Debasmita",
  role: "Software Dev",
  city: "Bengaluru",
  state: "Karnataka",
};

let { userId, ...newUserDetails } = userDetails;
