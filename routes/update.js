// ©GO-PC Build
// This project is under a CC0-1.0 License
// (View the license here: https://github.com/GO-PC-Build/DiscordBot/blob/master/LICENSE)
const router = require("express").Router();
const User = require("../model/User");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const verify = require("../utils/verifyToken");

router.post("/update", verify, async (req, res) => {
  const { name, email, avatar, discord } = req.body;
  if (!name && !email && !avatar && !discord)
    return res.status(400).send("Invalid provided data.");

  const base = await User.findOne(res.user);

  const update = await User.updateOne(
    { _id: req.user._id },
    {
      name: (name || base.name).toLowerCase(),
      email: (email || base.email).toLowerCase(),
      avatar: avatar || base.avatar,
      discord: discord || base.discord,
    }
  );

  if (update.n >= 1)
    return res.status(201).send(`Successfully changed values for ${base.name}`);
  return res
    .status(500)
    .send(
      "Oops, something went wrong while trying to process your request.\r\nPlease contact the administrator (@Arthurdw|Arthur#0002)!"
    );
});

module.exports = router;
