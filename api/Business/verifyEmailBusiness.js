const { apiResponse } = require("../../utils/apiResponse");
const { METHODS, STATUS } = require("../../utils/constants");
const { generateSHA256 } = require("../../utils/encryption");
const Logger = require("../../utils/logger");
const { createAccountService } = require("../Service/accountService");
const {
  findUserService,
  updateUserService,
  createUserService,
} = require("../Service/userService");
const {
  findproviderService,
  createproviderservice,
  updateproviderservice,
} = require("../Service/providerService");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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
      dbName: dbName,
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
    let { token } = payload;
    const providerDetails = await findproviderService({
      token: token,
    });
    if (!providerDetails) {
      return apiResponse(STATUS.NOT_FOUND, "user doesn't exist");
    }
    const dbName = `Faster_prov_${providerDetails._id}`;
    const accountPayload = {
      username: providerDetails.userName,
      providerId: providerDetails._id,
      email: providerDetails.email,
      accountName: providerDetails.firstName,
    };
    const accountDetails = await createAccountService(accountPayload);
    const data = {
      token: "",
      $push: {
        accountId: accountDetails._id,
      },
    };
    await updateproviderservice({ email: providerDetails.email }, data);
    const providerDBpayload = {
      userName: providerDetails.userName,
      access: "admin",
      providerId: providerDetails._id,
      lastSeen: new Date().toISOString(),
    };
    await createproviderservice(providerDBpayload, dbName);
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

const generateemailtoken = async (payload) => {
  try {
    const CLIENT_ID =
      "765309738906-i5r6kd3elqh8nekn2h9h8enj2vi84tv5.apps.googleusercontent.com";
    const CLIENT_SECRET = "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";
    const REDIRECT_URI = "https://developers.google.com/oauthplayground";
    // const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN'; // The Refresh Token you got from the playground

    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );
    // oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    // To Get an access token
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "fasterdevs@gmail.com",
        clientId:
          765309738906 -
          i5r6kd3elqh8nekn2h9h8enj2vi84tv5.apps.googleusercontent.com,
        clientSecret: GOCSPX - G_lNZSVxVEjuuNCp2Yfr4XmbTcaK,
        //refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });
    const mailOptions = {
      from: "fasterdevs@gmail.com",
      to: "allusurendra8@gmail.com",
      subject: "Hello from Node.js using Gmail API",
      text: "This is a test email sent from a faster application!",
      html: "<h1>Hello!</h1><p>This is a test email sent from a faster application!</p>",
    };

    // Send the email
    const result = await transport.sendMail(mailOptions);
    console.log("Email sent successfully:", result);
    return result;

    // Call the function to send the email
    // sendMail();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  verifyUserEmailBusiness,
  verifyProviderEmailBusiness,
  generateemailtoken,
};
