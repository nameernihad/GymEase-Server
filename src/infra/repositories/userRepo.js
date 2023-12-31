const bcrypt = require("bcrypt");
const AppError = require("../../utilis/error");

const UserRepoImpl = (userModel) => {
  const Create = async (user) => {
    try {
      const existingUser = await userModel.findOne({ email: user.email });
  
      if (existingUser) {
        throw new AppError('User already exists', 409);
      } else {
        const createdUser = await userModel.create(user);
        return createdUser.toObject();
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else if (error instanceof Error) {
        console.error(error.message);
        throw new AppError('An error occurred while creating the user', 500);
      } else {
        console.error('Unknown error:', error);
        throw new AppError('Unknown error occurred', 500);
      }
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
    const { name, email, phone, gender, height, weight,profilePhoto } = userDetails;
    console.log(profilePhoto)
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
          profilePhoto
        },
        { new: true }
      );

        return updatedData

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
