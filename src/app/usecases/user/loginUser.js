const bcrypt = require("bcrypt");
const { generateToken } = require("../../../interface/middleware/authToken");

const loginUser = (userRepository) => async (email, password) => {
  console.log(email, password);
  const user = await userRepository.findByemail(email);
  if (user) {
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return user;
    }
  }
  return null;
};

const loginWithGoogle = (userRepository) => async (email, name, image) => {
  const user = await userRepository.findByemail(email);
  if (!user) {
    const newUser = await userRepository.Create({ email, name, image });
    if (!newUser) {
      return "Something went wrong";
    }
    const token = generateToken(user);

    return token;
  } else {
    const token = generateToken(user);
    return token;
  }
  return null;
};

module.exports = {
  loginUser,
  loginWithGoogle,
};
