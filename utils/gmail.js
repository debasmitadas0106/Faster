const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const {
  getGoogleAuthService,
  updateGoogleAuthService,
} = require("../api/Service/googleAuthService");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://fasterfrontend.fun/api/oauth2callback"
);

async function sendMail(payload) {
  try {
    let { to, subject, html, userEmail } = payload;
    const googleAuthDetails = await getGoogleAuthService({ email: userEmail });
    let { accessToken, refreshToken, expiryTime } = googleAuthDetails;
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
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
  oauth2Client,
};

// setTimeout(async () => {
//   console.log("Testing token refresh...");
//   const result = await googleAuth("test@gmail.com");
//   console.log("New token:", result);
// }, 5000);
