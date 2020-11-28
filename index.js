// Â©GO-PC Build
// This project is under a CC0-1.0 License
// (View the license here: https://github.com/GO-PC-Build/DiscordBot/blob/master/LICENSE)
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require("cors");

const PORT = 25578;
const BASE = "/";

// Routes
const authRoute = require("./routes/auth");
const meRoute = require("./routes/me");
const updateRoute = require("./routes/update");
const mailRoute = require("./routes/mail");

dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Successfully established connection to database.")
);

// Middleware
app.use(express.json());
app.use(cors());

// Route Middleware
app.use(`${BASE}user`, authRoute);
app.use(`${BASE}user`, updateRoute);
app.use(`${BASE}@me`, meRoute);
// app.use(`${BASE}mail`, mailRoute);

app.listen(PORT, () =>
  console.log(`Server is up and running on port ${PORT}! (base route ${BASE})`)
);
