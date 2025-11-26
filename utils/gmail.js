const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const {
  getGoogleAuthService,
  updateGoogleAuthService,
} = require("../api/Service/googleAuthService");

async function sendMail(payload) {
  try {
    let { to, subject, html, userEmail } = payload;
    const googleAuthDetails = await getGoogleAuthService({ email: userEmail });
    let { accessToken, refreshToken, expiryTime, clientId, clientSecret } =
      googleAuthDetails;

    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      "https://fasterfrontend.fun/api/oauth2callback"
    );
    let currentTimeMilis = new Date().getTime();
    if (currentTimeMilis > expiryTime) {
      oauth2Client.setCredentials({
        refresh_token: refreshToken,
      });

      const { credentials } = await oauth2Client.refreshAccessToken();
      //   console.log(credentials, "credddddddsssssss------>");
      accessToken = credentials?.access_token;
      expiryTime = credentials?.expiry_date;
      refreshToken = credentials?.refresh_token;
      scopes = credentials?.scope;

      await updateGoogleAuthService(
        { email: userEmail },
        {
          accessToken,
          expiryTime,
          refreshToken,
        }
      );
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: userEmail,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });

    const response = await transporter.sendMail({
      from: userEmail,
      to,
      subject,
      html,
    });

    console.log("Email sent:", response.messageId);
    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendMail,
};

// setTimeout(async () => {
//   console.log("Testing token refresh...");
//   const result = await googleAuth("test@gmail.com");
//   console.log("New token:", result);
// }, 5000);
