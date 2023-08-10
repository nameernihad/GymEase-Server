const {
  setNewPassword,
} = require("../../app/usecases/resetPassword/resetPassword");
const { UserModel } = require("../../infra/database/userModel");
const { UserRepoImpl } = require("../../infra/repositories/userRepo");
const { sendMail } = require("../../services/sentMail");

const db = new UserModel();

const userRepository = UserRepoImpl(db);

const sentEmial = async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await userRepository.findByemail(email);
    const emailsented = sendMail(userData);
    if (emailsented) {
      res
        .status(200)
        .json({ message: "Email Success fully sended", emailsented });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const PasswordReset = async (req, res) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;
    console.log(userId, password);
    const updatedData = await setNewPassword(userRepository)(userId, password);
    if (updatedData) {
      res.status(201).json({ message: "password Updated", updatedData });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  sentEmial,
  PasswordReset,
};
