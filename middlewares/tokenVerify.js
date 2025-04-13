const { findUserService } = require("../api/Service/userService");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { VERIFY_BLACKLIST } = require("./constants");
const { METHODS } = require("../utils/constants");
const Logger = require("../utils/logger");

let verifyTokenMiddleware = async (req, res, next) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO} || ${METHODS.VERIFY_TOKEN}}`
  );
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  if (VERIFY_BLACKLIST.includes(req.url)) {
    console.log("bypass token verification");
    return next();
  }
  let token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer")) {
    return res.status(401).json({ msg: "Please pass correct token" });
  }
  token = token.slice(7);
  //console.log("token-->", token);
  const verified = jwt.verify(token, jwtSecretKey);
  //console.log(verified, "vvvvvvvvv-------->");

  let userDetails = await findUserService({ _id: verified.userId });
  logger.debug(` userDetals || ${JSON.stringify(userDetails)}`)
  if (!userDetails) {
    throw "invalid credentials";
  }
  req.user = {
    //db_name:req.headers.dbUrl, WILL SEND LATER AFTER ACCOUNT CREATION AFTER PASSING DBURL N THE HEADERS
    userDetails: userDetails,
    session_id: `${uuidv4()}_${verified.userId}`,
  };
  next();
};

module.exports = {
  verifyTokenMiddleware,
};
