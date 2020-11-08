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
  console.log(base);

  const update = await User.updateOne(
    { _id: req.user._id },
    {
      name: (name || base.name).toLowerCase(),
      email: (email || base.email).toLowerCase(),
      avatar: avatar || base.avatar,
      discord: discord || base.discord,
    }
  );

  console.log(update.n);
  res.send({ name, email, avatar, discord });
});

// router.post("/login", verify, async (req, res) => {
// });

module.exports = router;
