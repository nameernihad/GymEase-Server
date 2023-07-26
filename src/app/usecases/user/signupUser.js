const { User } = require("../../../domain/model/user");
const userRepo = require("../../../infra/repositories/userRepo");
const bcrypt = require("bcrypt");

const sigupUser = (userRepo) => async (name, email, password, phone) => {
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
  sigupUser,
};
