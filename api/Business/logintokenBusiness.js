const { findproviderService } = require("../Service/providerService");
const { METHODS, STATUS } = require("../../utils/constants");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Logger = require("../../utils/logger");
const { apiResponse } = require("../../utils/apiResponse");
const { findUserService } = require("../Service/userService");
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const generatelogintoken = async (credentials) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO} || ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.PROVIDER.GENERATE_LOGIN_TOKEN}`
  );
  try {
    const { username, password } = credentials;
    logger.debug(`username and password || ${username},${password}`);
    let providerDetails = await findproviderService({
      $or: [{ username: username }, { email: username }],
    });
    logger.debug(`providerDetails || ${JSON.stringify(providerDetails)}`);
    if (!providerDetails) {
      return apiResponse(STATUS.NOT_FOUND, "No provider found");
    }
    if (password != providerDetails.password) {
      return apiResponse(STATUS.BAD_REQUEST, "password doesnt match");
    }
    const token = jwt.sign(
      {
        _id: providerDetails._id,
        email: providerDetails.email,
        role: providerDetails.role,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    return apiResponse(STATUS.SUCCESS, "", "", { providerDetails, token });
  } catch (error) {
    logger.debug(` login failed || ${JSON.stringify(error)}`);
  }
};

const generateUserlogintoken = async (credentials) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}||  ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.GENERATE_LOGIN_TOKEN}`
  );
  try {
    const { username, password } = credentials;
    logger.debug(`username and password || ${username},${password}`);
    let userdetail = await findUserService({
      $or: [{ userName: username }, { email: username }],
    });
    logger.debug(`userdetails || ${JSON.stringify(userdetail)}`);
    if (!userdetail) {
      return apiResponse(STATUS.NOT_FOUND, "No user found");
    }
    if (password != userdetail.password) {
      return apiResponse(STATUS.BAD_REQUEST, "password doesnt match");
    }
    const token = jwt.sign(
      {
        _id: userdetail._id,
        email: userdetail.email,
        role:userdetail.role
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    return apiResponse(STATUS.SUCCESS, "", "", { userdetail, token });
  } catch (error) {
    logger.debug(` login failed || ${JSON.stringify(error)}`);
  }
};

const email_verify_generate_token=async (userregisterdetail) =>{
  const logger = new Logger(
    `${METHODS.ENTERING_TO}||  ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.USER.GENERATE_LOGIN_TOKEN}`
  );
  try{
    const {email,username}=userregisterdetail;
    logger.debug(`email verifed ${username} and ${email}`)
    const emailverifyingtoken=jwt.sign(
      {
        useremail:email,
        username:username,
        'purpose':'emailverification'
    },SECRET_KEY,{expiresIn: "24h" });
    logger.debug(`emailverifiyingtoken is sending....><: ${emailverifyingtoken}`)
    return emailverifyingtoken
  }
  catch(error){
    logger.debug(` login failed || ${JSON.stringify(error)}`);
  }
}

const emailverifiation=async(token)=>{
  try{
    const email_verification=jwt.verify(token,SECRET_KEY);
    const {purpose}=email_verification
    console.log('emailverification==',JSON.stringify(email_verification),email_verification.purpose)
    if(email_verification && purpose==='emailverification'){
      console.log('user got confirmed')
      return 'user got confirmed'
    }
    else{
      return 'token got expired'
    }
  }catch(error){

  }
}
  // const verifyauthorisetoken = async (token) => {
//   try {
//     let verification = jwt.verify(token, SECRET_KEY, { algorithms: ["HS256"] });
//     console.log(verification);
//     return verification;
//   } catch (error) {}
// };


module.exports = {
  generatelogintoken,
  email_verify_generate_token,
  emailverifiation,
  generateUserlogintoken,
};
