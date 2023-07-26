const bcrypt = require("bcrypt");

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
module.exports = {
  loginUser,
};
