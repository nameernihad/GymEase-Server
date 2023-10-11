// userStatusByEmail.js

const { UserModel } = require("../../infra/database/userModel");
const { UserRepoImpl } = require("../../infra/repositories/userRepo");

const userRepository = UserRepoImpl(UserModel);

async function checkUserStatusByEmail(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await userRepository.findByemail(email);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.isBlock) {
      return res.status(403).json({ message: "User is blocked" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { checkUserStatusByEmail };
