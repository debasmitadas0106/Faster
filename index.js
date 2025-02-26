console.log("initiating faster with the blessings of Ma");
console.log("i am the ceo bitch");
const path = require("path");
const http = require("http");
const swaggerTools = require("swagger-tools");
const jsyaml = require("js-yaml");
const fs = require("fs");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Redis = require("ioredis");

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "*", // Allow requests from any origin or specify your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Specify allowed HTTP methods
  })
);
const serverPort = process.env.PORT || 5000;

// Middleware setup
app.use(express.json({ limit: "40mb" }));
app.use(express.urlencoded({ extended: true }));

// Load Swagger YAML file
const spec = fs.readFileSync(path.join(__dirname, "api/swagger.yaml"), "utf8");
const swaggerDoc = jsyaml.load(spec);

// Swagger Router options
const options = {
  controllers: path.join(__dirname, "./api/controller"), // Directory containing controllers
};

// Healthcheck endpoint
app.get("/api/healthcheck", async (req, res) => {
  // Implement your health check logic
  return res.status(200).send({ msg: "Everything working fine" });
});

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
