const nodemailer = require("nodemailer");

const sendMail = (emailOptions) => {
  console.log(emailOptions);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: emailOptions.to,
    subject: emailOptions.subject,
    html: emailOptions.html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    } else {
      console.log(info, "info");
      return info.response;
    }
  });
};

module.exports = {
  sendMail,
};
