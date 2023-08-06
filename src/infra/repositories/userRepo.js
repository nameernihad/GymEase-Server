const { UserModel } = require("../database/userModel");

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
    const user = await userModel.findOne({ email, isAdmin: false });
    return user ? user.toObject() : null;
  };

  const getUserById = async (userid) => {
    const userById = await userModel.findOne({ _id: userid });
    console.log(userById);
    return userById;
  };

  const findOne = async (user) => {
    const currentUser = await userModel.findOne({ user });
    return currentUser ? currentUser.toObject() : null;
  };

  const find = async () => {
    const allUser = await userModel.find({
      $and: [{ isAdmin: false }, { isTrainer: false }],
    });
    return allUser;
  };

  const BlockingUser = async (id) => {
    try {
      const user = await userModel.findOne({ _id: id });
      if (user) {
        const updatedIsBlock = !user.isBlock;

        const updateResult = await userModel.updateOne(
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

  return {
    Create,
    findByemail,
    getUserById,
    find,
    findOne,
    BlockingUser,
  };
};

module.exports = {
  UserRepoImpl,
};
