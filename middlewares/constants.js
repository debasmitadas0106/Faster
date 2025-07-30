//let VERIFY_BLACKLIST = [
//   "/api/docs",
//   "/api/docs/",
//   "/api/docs/swagger-ui-standalone-preset.js",
//   "/api/docs/swagger-ui.css",
//   "/api/docs/swagger-ui-bundle.js",
//   "/api/docs/favicon-32x32.png",
//   "/api/docs/favicon-16x16.png",
//   "/api/api-docs",
//   "/api/login/provider",
//   "/api/login/user",
//   "/api/provider",
//   "/api/user",
//   "/api/user/verify-email",
//   "/api/provider/verify-email",
// ];

const VERIFY_BLACKLIST = [
  "/api/docs/",
  "/api/docs/css/",
  "/api/docs/lib/",
  "/api/docs/images/",
  "/api/docs/swagger-ui.js",
  "/api/docs/css/typography.css",
  "/api/docs/css/reset.css",
  "/api/docs/css/screen.css",
  "/api/docs/css/print.css",
  "/api/docs/lib/jquery-1.8.0.min.js",
  "/api/docs/lib/jquery.slideto.min.js",
  "/api/docs/lib/jquery.wiggle.min.js",
  "/api/docs/lib/jquery.ba-bbq.min.js",
  "/api/docs/lib/handlebars-2.0.0.js",
  "/api/docs/lib/js-yaml.min.js",
  "/api/docs/lib/lodash.min.js",
  "/api/docs/lib/backbone-min.js",
  "/api/docs/lib/highlight.7.3.pack.js",
  "/api/docs/lib/jsoneditor.min.js",
  "/api/docs/lib/marked.js",
  "/api/docs/lib/swagger-oauth.js",
  "/api/docs/images/favicon-32x32.png",
  "/api/docs/images/favicon-16x16.png",
  "/api/api-docs"
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
