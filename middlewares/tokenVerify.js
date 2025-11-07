const { findUserService } = require("../api/Service/userService");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { VERIFY_BLACKLIST } = require("./constants");
const { METHODS } = require("../utils/constants");
const Logger = require("../utils/logger");
const { findproviderService } = require("../api/Service/providerService");

let verifyTokenMiddleware = async (req, res, next) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO} || ${METHODS.VERIFY_TOKEN}}`
  );
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  if (
    req.url.startsWith("/api/docs/") ||
    req.url.startsWith("/api") ||
    VERIFY_BLACKLIST.includes(req.url)
  ) {
    console.log("bypass token verification", req.url);
    return next();
  }
  let token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer")) {
    console.log("asking the token to ", req.url);
    return res.status(401).json({ msg: "Please pass correct token" });
  }
  token = token.slice(7);
  //console.log("token-->", token);
  const verified = jwt.verify(token, jwtSecretKey);
  //console.log(verified, "vvvvvvvvv-------->");
  let clientDetails;
  if (verified.role === "user") {
    clientDetails = await findUserService({ _id: verified._id });
  } else {
    clientDetails = await findproviderService({ _id: verified._id });
  }
  logger.debug(` clientDetails || ${JSON.stringify(clientDetails)}`);
  if (!clientDetails) {
    throw "invalid credentials";
  }
  req.user = {
    db_name: req.headers?.dburl || "",
    userDetails: clientDetails,
    session_id: `${uuidv4()}_${verified._id}`,
  };
  next();
};

module.exports = {
  verifyTokenMiddleware,
};
