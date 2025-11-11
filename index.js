console.log("initiating faster with the blessings of Ma");
const path = require("path");
const http = require("http");
const swaggerTools = require("swagger-tools");
const jsyaml = require("js-yaml");
const fs = require("fs");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Redis = require("ioredis");
const { verifyTokenMiddleware } = require("./middlewares/tokenVerify");
const { verifyDb } = require("./middlewares/verifyDatabase");

dotenv.config();
const app = express();
app.enable("trust proxy");

// 🛡️ Force HTTPS redirect (place BEFORE routes)
app.use((req, res, next) => {
  if (req.secure || req.headers["x-forwarded-proto"] === "https") {
    next();
  } else {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
});
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
const serverPort = process.env.PORT || 5000;

app.use(express.json({ limit: "40mb" }));
app.use(express.urlencoded({ extended: true }));

const spec = fs.readFileSync(path.join(__dirname, "api/swagger.yaml"), "utf8");
const swaggerDoc = jsyaml.load(spec);

// Swagger Router options
const options = {
  controllers: path.join(__dirname, "./api/Controller"), // Directory containing controllers
};

app.get("/api/healthcheck", async (req, res) => {
  return res.status(200).send({ msg: "Everything working fine" });
});
app.use(verifyTokenMiddleware);
//app.use(verifyDb)

swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerValidator());

  // Dynamically route requests
  app.use(middleware.swaggerRouter(options));

  // Swagger UI setup
  app.use("/api", middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, "0.0.0.0", () => {
    console.log(
      `Your server is listening on port ${serverPort} (http://localhost:${serverPort})`
    );
    console.log(
      `Swagger-ui is available on http://localhost:${serverPort}/api/docs`
    );
  });
});
