const nodemailer = require("nodemailer");

const sendMail = (userData) => {
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
    to: userData.email,
    subject: "Password Reset",
    html: `
      <p>Hello,${userData.name}</p>
      <p>Please click the link below to reset your password:</p>
      <a href="http://localhost:3000/restPass/${userData._id}">Reset Password</a>
    `,
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
