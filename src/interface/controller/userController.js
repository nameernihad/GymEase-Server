const { loginUser } = require("../../app/usecases/user/loginUser");
const { sigupUser } = require("../../app/usecases/user/signupUser");
const {
  validateSignupData,
  validateLoginData,
} = require("../../domain/entities/userValidation");
const { UserModel } = require("../../infra/database/userModel");
const { UserRepoImpl } = require("../../infra/repositories/userRepo");
const { generateToken } = require("../middleware/authToken");

const db = UserModel;

const userRepository = UserRepoImpl(db);

const UserRegister = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const validationErrors = validateSignupData(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }
  try {
    const user = await sigupUser(userRepository)(name, email, password, phone);
    if (!user) {
      res.status(500).json({ message: "Somthing went wrong" });
    }
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validationErrors = validateLoginData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const user = await loginUser(userRepository)(email, password);

    if (user) {
      const token = generateToken(user);
      res.status(200).json({ message: "login Successful", user, token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  UserRegister,
  UserLogin,
};
