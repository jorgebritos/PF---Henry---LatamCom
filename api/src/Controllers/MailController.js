const { Category } = require("../db.js");
const axios = require("axios");
const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  try {
    const { from, to, subject, text } = req.body
    if (!from || !to || !subject || !text) return res.status(422).send("Missing data");

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: from, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text text
      html: `
      <h1>${subject}<h1/>
      <p>${text}<p/>
      from: ${from}
      `, // html text
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.status(200);
  } catch (error) {
    res.sendStatus(404)
  }
}

module.exports = {
  sendMail
};