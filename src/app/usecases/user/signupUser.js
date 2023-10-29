const { User } = require("../../../domain/model/user");
const userRepo = require("../../../infra/repositories/userRepo");
const bcrypt = require("bcrypt");

const signupUser = (userRepo) => async (name, email, phone, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    name,
    email,
    password: hashedPassword,
    phone,
  };

  const createdUser = await userRepo.Create(newUser);
  return createdUser;
};
module.exports = {
  signupUser,
};
