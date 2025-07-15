const { apiResponse } = require("../../utils/apiResponse");
const { METHODS, STATUS } = require("../../utils/constants");
const { generateSHA256 } = require("../../utils/encryption");
const Logger = require("../../utils/logger");
const { createAccountService } = require("../Service/accountService");
const {findUserService,updateUserService,createUserService,} = require("../Service/userService");
const {findproviderService,createproviderservice,updateproviderservice} = require("../Service/providerService");
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');


const verifyUserEmailBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.EMAIL.VERIFY_EMAIL}`
  );
  logger.debug(` payload || ${JSON.stringify(payload)}`);
  try {
    let { token } = payload;
    const userDetails = await findUserService({ token: token });
    if (!userDetails) {
      return apiResponse(
        STATUS.NOT_FOUND,
        "User doesnt exist or token is invalid"
      );
    }
    const dbName = `Faster_user_${userDetails._id}`;
    let accountPayload = {
      userName: userDetails.userName,
      userId: userDetails._id,
      accountName: userDetails.firstName,
      fasterCoins: 10,
      email: userDetails.email,
    };
    const accountDetails = await createAccountService(accountPayload);
    const data = {
      token: "",
      $push: {
        accountId: accountDetails._id,
      },
    };
    await updateUserService({ email: userDetails.email }, data);
    const userDBpayload = {
      userName: userDetails.userName,
      access: "admin",
      userId: userDetails._id,
      lastSeen: new Date().toISOString(),
    };
    await createUserService(userDBpayload, dbName);
    return apiResponse(
      STATUS.SUCCESS,
      "",
      "email verified and account created successfully"
    );
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.log(error);
  }
};

const verifyProviderEmailBusiness = async (payload, query) => {
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.EMAIL.VERIFY_EMAIL}`
  );
  logger.debug(` payload || ${JSON.stringify(payload)}`);
  try {
    let { username,email } = payload;
    const userDetails=await findproviderService({
      $or:[{username},{email}],
    });
    if(!userDetails){
      return apiResponse(
        STATUS.NOT_FOUND,
        "user doesn't exist"
      );
    }
    const dbName=`Faster_provider_${userDetails._id}`
    const accountpayload={
      username:userDetails.username,
      email:userDetails.email,
      accountName:userDetails.accountName
    }
        const accountDetails = await createAccountService(accountPayload);
    const data = {
      token: "",
      $push: {
        accountId: accountDetails._id,
      },
    };
    await updateproviderservice({ email: userDetails.email }, data);
    const userDBpayload = {
      userName: userDetails.userName,
      access: "admin",
      userId: userDetails._id,
      lastSeen: new Date().toISOString(),
    };
    await createproviderservice(userDBpayload, dbName);
    return apiResponse(
      STATUS.SUCCESS,
      "",
      "email verified and account created successfully"
    );
  } catch (error) {
    logger.debug(`error || ${JSON.stringify(error)}`);
    console.log(error);
  }
};

const transporter=nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:'',
    pass:''
  }
});

const generateemailtoken=async (payload)=>{
  try{
  const token= jwt.sign({email: 'allusurendra8@gmail.com',purpose:'emailtestverify'},'secretkey',{
    expiresIn:'24h'
  });
  const url=``;
  const mailOptions={
    from:'',
    to: '',
    subject:'verifying email',
    html: `<h2>Email Verification</h2>
           <p>Click the link below to verify your email:</p>
           <a href="${url}">${url}</a>`
  };
  await transporter.sendMail(mailOptions);
  console.log('verification email sended successfully');
}catch(error){
  console.log('error in sending email: ',error);
}
}

module.exports = {
  verifyUserEmailBusiness,
  verifyProviderEmailBusiness,generateemailtoken
};
