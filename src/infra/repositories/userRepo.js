const { UserModel } = require("../database/userModel");

const UserRepoImpl = (userModel) => {
  const Create = async (user) => {
    console.log(user, "oihgufyh");
    try {
      const createdUser = await UserModel.create(user);
      console.log(createdUser);
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

  const find = async (id) => {
    const allUser = await userModel.find();
    return allUser.map((user) => {
      user.toObject();
    });
  };

  return {
    Create,
    findByemail,
    findById,
    find,
    findOne,
  };
};

module.exports = {
  UserRepoImpl,
};
