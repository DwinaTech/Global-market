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
app.use(bodyParser.json());
app.use(cors());

/**
 * register routes
 */
app.use("/api", api);

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
