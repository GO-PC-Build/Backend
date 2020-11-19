// ©GO-PC Build
// This project is under a CC0-1.0 License
// (View the license here: https://github.com/GO-PC-Build/DiscordBot/blob/master/LICENSE)
const mongoose = require("mongoose");
const makeId = require("../utils/tokenGeneration").makeId;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 5,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
    required: true,
    default: `https://eco.xiler.net/images/defaultProfilePicture.png`,
    max: 512,
  },
  discord: {
    type: String,
    required: false,
  },
  mailCode: {
    type: String,
    required: false,
    default: makeId(32),
  },
});

module.exports = mongoose.model("User", userSchema);
