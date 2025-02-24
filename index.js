console.log("initiating faster with the blessings of Ma");
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 8080;

app.get("/", async (req, res) => {
  try {
    const obj = {
      name: "Faster",
      collaboratore: ["Allu Surendra", "Debasmita"],
      response: {
        data: "starting faster server",
      },
    };
    res.json(obj.response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
