const { UserModel } = require("../database/userModel");
const bcrypt = require("bcrypt");

const UserRepoImpl = (userModel) => {
  const Create = async (user) => {
    try {
      const createdUser = await UserModel.create(user);
      return createdUser.toObject();
    } catch (error) {
      console.log(error.message);
    }
  };

  const findByemail = async (email) => {
    const user = await UserModel.findOne({
      email,
      isAdmin: false,
      isTrainer: false,
    });
    return user ? user.toObject() : null;
  };

  const getUserById = async (userid) => {
    const userById = await UserModel.findOne({ _id: userid });
    console.log(userById);
    return userById;
  };

  const findOne = async (user) => {
    const currentUser = await UserModel.findOne({ user });
    return currentUser ? currentUser.toObject() : null;
  };

  const find = async () => {
    const allUser = await UserModel.find({
      $and: [{ isAdmin: false }, { isTrainer: false }],
    });
    return allUser;
  };

  const BlockingUser = async (id) => {
    try {
      const user = await UserModel.findOne({ _id: id });
      if (user) {
        const updatedIsBlock = !user.isBlock;

        const updateResult = await UserModel.updateOne(
          { _id: id },
          { $set: { isBlock: updatedIsBlock } }
        );

        if (updateResult) {
          return !user.isBlock;
        }
      } else {
        console.log("User not found!");
        return null;
      }
    } catch (error) {
      console.error("Error while updating user:", error);
      return null;
    }
  };

  const PasswordReset = async (userId, password) => {
    try {
      console.log(userId, password);
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedData = await UserModel.findByIdAndUpdate(
        { _id: userId },
        {
          $set: { password: hashedPassword },
        }
      );

      return updatedData;
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    Create,
    findByemail,
    getUserById,
    find,
    findOne,
    BlockingUser,
    PasswordReset,
  };
};

module.exports = {
  UserRepoImpl,
};
