const { findUserService } = require("../api/Service/userService");
const { METHODS, STATUS } = require("../utils/constants");
const Logger = require("../utils/logger");
const { VERIFY_DB_BLACKLIST } = require("./constants");

const verifyDb = async (req, res, next) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO} || ${METHODS.VERIFY_DATABASE}}`
  );
  if (
    req.url.startsWith("/api/docs/") ||
    VERIFY_DB_BLACKLIST.includes(req.url)
  ) {
    console.log("bypass database verification", req.url);
    // logger.debug("bypass database verification");
    return next();
  }
  if (!req.user.db_name) {
    return res.status(STATUS.SUCCESS).send({
      status: STATUS.BAD_REQUEST,
      errMsg: "account Url is required.",
    });
  }
  let user = await findUserService(
    { userId: req.user.userDetails._id },
    req.user.db_name
  );
  if (user) {
    return next();
  } else {
    return res.status(401).json({ msg: "User Unauthorized" });
  }
};
module.exports = {
  verifyDb,
};
