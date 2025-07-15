let VERIFY_BLACKLIST = [
  "/api/docs",
  "/api/docs/",
  "/api/docs/swagger-ui-standalone-preset.js",
  "/api/docs/swagger-ui.css",
  "/api/docs/swagger-ui-bundle.js",
  "/api/docs/favicon-32x32.png",
  "/api/docs/favicon-16x16.png",
  "/api/api-docs",
  "/api/login/provider",
  "/api/login/user",
  "/api/provider",
  "/api/user",
  "/api/user/verify-email",
  "/api/provider/verify-email",
];

let VERIFY_DB_BLACKLIST = [
  "/api/docs",
  "/api/docs/",
  "/api/docs/swagger-ui-standalone-preset.js",
  "/api/docs/swagger-ui.css",
  "/api/docs/swagger-ui-bundle.js",
  "/api/docs/favicon-32x32.png",
  "/api/docs/favicon-16x16.png",
  "/api/api-docs",
  "/api/login/provider",
  "/api/login/user",
  "/api/provider",
  "/api/user",
  "/api/user/verify-email",
  "/api/provider/verify-email",
];
module.exports = {
  VERIFY_BLACKLIST,
  VERIFY_DB_BLACKLIST,
};
