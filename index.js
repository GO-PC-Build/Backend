// ©GO-PC Build
// This project is under a CC0-1.0 License
// (View the license here: https://github.com/GO-PC-Build/DiscordBot/blob/master/LICENSE)
const { request } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const PORT = 8080;
const BASE = "/api/";

// Routes
const authRoute = require("./routes/auth");
const meRoute = require("./routes/me");
const updateRoute = require("./routes/update");

dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to db")
);

// Middleware
app.use(express.json());

// Route Middleware
app.use(`${BASE}user`, authRoute);
app.use(`${BASE}@me`, meRoute);
app.use(`${BASE}user`, updateRoute);

app.listen(PORT, () =>
  console.log(`Server is up and running on port ${PORT}!`)
);
