const { findproviderService } = require("../Service/providerService");
const { METHODS, STATUS } = require("../../utils/constants");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Logger = require("../../utils/logger");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const generatelogintoken = async (credentials) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.GENERATELOGINTOKEN}`
  );  try{
  const username=credentials.username;
  const password=credentials.password;
  logger.debug(`tyhe username and password ${username},${password}`);
  let userdetail = await findproviderService(
    { $or: [{ username: username }, { email: username }] }
  ); 
  if (userdetail != null) {
    if(password === userdetail.password){
    payload = {
      user_id: userdetail._id,
      username: userdetail.username,
      role: userdetail.role,
    };
    let token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1hr",algorithm:'HS256'});
    return token;
  }
  else{
    return "password is wrong"
  }
  } else {
    return "username is wrong";
  }
}
catch(error){
  logger.debug(` login failed || ${JSON.stringify(error)}`);
}
}

const verifyauthorisetoken=async(token)=>{
  try{
    let verification=jwt.verify(token,SECRET_KEY,{algorithms:['HS256']});
    console.log(verification);
    return verification;
  }
  catch(error){

  }
}

module.exports={generatelogintoken,
                verifyauthorisetoken};