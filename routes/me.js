// ©GO-PC Build
// This project is under a CC0-1.0 License
// (View the license here: https://github.com/GO-PC-Build/DiscordBot/blob/master/LICENSE)
const router = require("express").Router();
const User = require("../model/User");
const verify = require("../utils/verifyToken");

router.get("/", verify, async (req, res) => {
  try {
    const { _id, name, email, avatar, discord, date } = await User.findById(req.user);
    return res.send({ id: _id, name, email, avatar, discord, date });
  } catch (err) {
    return res
      .status(500)
      .send(
        "Oops, something went wrong while trying to process your request.\r\nPlease contact the administrator (@Arthurdw|Arthur#0002)!"
      );
  }
});

module.exports = router;
