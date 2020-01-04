const SERVER_PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const api = require("./api");

/**
 * register middleware
 */
app.use(express.static("../Client/build"));
app.use(bodyParser.json());
app.use(cors());

/**
 * register routes
 */
app.use("/api", api);

// send the user to index html page inspite of the url
if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Client/build/index.html"));
  });
}

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
