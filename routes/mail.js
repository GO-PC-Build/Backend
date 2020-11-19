// ©GO-PC Build
// This project is under a CC0-1.0 License
// (View the license here: https://github.com/GO-PC-Build/DiscordBot/blob/master/LICENSE)
const router = require("express").Router();
const User = require("../model/User");
const verify = require("../utils/verifyToken");
const mailer = require("nodemailer");

router.post("/send", verify, async (req, res) => {
  // const { name, email, mailCode } = await User.findById(req.user);

  // const response = await mailchimp.messages.send({
  //   message: {
  //     to: [{ email, name }],

  //     from_email: "arthur.dewitte@leerling.go-atheneumoudenaarde.be",
  //     subject: "Test",
  //     text: `Test\r\n${process.env.DEFAULT_URL}verifyMail/${mailCode}`,
  //     important: true,
  //   }
  // })
  // console.log(response)
  // res.send(response)


  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await mailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = mailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  console.log(testAccount.user + " " + testAccount.pass)

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "arthur.dewitte@leerling.go-atheneumoudenaarde.be",
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }).catch((err) => res.status(500).send("Something went wrong while trying to send the mail!"))

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", mailer.getTestMessageUrl(info));
  return res.send(mailer.getTestMessageUrl(info))
});

module.exports = router;
