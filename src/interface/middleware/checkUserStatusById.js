// userStatusByUserId.js

const { UserModel } = require("../../infra/database/userModel");
const { UserRepoImpl } = require("../../infra/repositories/userRepo");

const userRepository = UserRepoImpl(UserModel);

async function checkUserStatusByUserId(req, res, next) {
  const userId = req.user._id;

  try {
    const user = await userRepository.getUserById(userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.isBlock) {
      return res.status(403).json({ message: "You are blocked by admin" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { checkUserStatusByUserId };
