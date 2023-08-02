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

  const findById = async (id) => {
    const userById = await userModel.findOne({ id: _id });
    return userById ? userById.toObject() : null;
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
    const updateResult = await userModel.updateOne(
      { _id: id },
      { $set: { isBlock: true } }
    );
    if (updateResult) {
      console.log(updateResult);
      return updateResult;
    }
  };
  const UnBlockingUser = async (id) => {
    const updateResult = await userModel.updateOne(
      { _id: id },
      { $set: { isBlock: false } }
    );
    if (updateResult) {
      console.log(updateResult);
      return updateResult;
    }
  };
  return {
    Create,
    findByemail,
    findById,
    find,
    findOne,
    BlockingUser,
    UnBlockingUser,
  };
};

module.exports = {
  UserRepoImpl,
};
