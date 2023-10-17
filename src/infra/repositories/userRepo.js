const { UserModel } = require("../database/userModel");
const bcrypt = require("bcrypt");

const UserRepoImpl = (userModel) => {
  const Create = async (user) => {
    try {
      const createdUser = await userModel.create(user);
      return createdUser.toObject();
    } catch (error) {
      console.log(error.message);
    }
  };

  const findByemail = async (email) => {
    const user = await userModel.findOne({
      email,
      isAdmin: false,
      isTrainer: false,
    });
    return user ? user.toObject() : null;
  };

  const getUserById = async (userid) => {
    console.log(userid, "repo");
    const user = await userModel.findById(userid);

    return user;
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

  const PasswordReset = async (userId, password) => {
    try {
      console.log(userId, password);
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedData = await userModel.findByIdAndUpdate(
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

  const UpdatedUser = async (userId, userDetails) => {
    console.log(userDetails);
    const { name, email, phone, gender, height, weight } = userDetails;
    try {
      const updatedData = await userModel.findByIdAndUpdate(
        userId,
        {
          name,
          email,
          phone,
          gender,
          height,
          weight,
        },
        { new: true }
      );
    } catch (error) {
      return error.message;
    }
  };


  const calculatingBMI = async (userId) => {
    try {
      const user = await userModel.findOne({ _id: userId });
  
      if (!user) {
        return null;
      }
      
      const heightInMeters = user.height / 100; 
      const weight = user.weight;
      const BMI = weight / (heightInMeters * heightInMeters);
  
      return BMI;
    } catch (error) {
      console.error(error);
      throw error;
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
    UpdatedUser,
    calculatingBMI
  };
};

module.exports = {
  UserRepoImpl,
};
