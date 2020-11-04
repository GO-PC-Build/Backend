// ©GO-PC Build
// This project is under a CC0-1.0 License
// (View the license here: https://github.com/GO-PC-Build/DiscordBot/blob/master/LICENSE)
const router = require("express").Router();
const User = require("../model/User");
const verify = require("../utils/verifyToken");

router.get("/", verify, async (req, res) => {
  const { _id, name, email } = await User.findOne({ _id: req.user });
  return res.send({ id: _id, name: name, mail: email });
});

module.exports = router;
