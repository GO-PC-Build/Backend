// ©GO-PC Build
// This project is under a CC0-1.0 License
// (View the license here: https://github.com/GO-PC-Build/DiscordBot/blob/master/LICENSE)
const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { registerValidation, loginValidation } = require("../utils/validation");

router.post("/register", async (req, res) => {
  // Validate data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //   Create new user
  const user = new User({
    name: req.body.name.toLowerCase(),
    email: req.body.email.toLowerCase(),
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user.id });
    console.log(`Registered: ${user.name} (${user.email})`);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  // Validate data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user exists
  const nameExists = await User.findOne({ name: req.body.name.toLowerCase() });
  const emailExists = await User.findOne({
    email: req.body.name.toLowerCase(),
  });

  const user =
    nameExists || emailExists ? (nameExists ? nameExists : emailExists) : null;

  if (!user) return res.status(400).send("Invalid username/email or password");

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).send("Invalid username/email or password");

  // Create and assign JWT
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  res.header("auth-token", token).send(token);
});

module.exports = router;
