const {
  loginUser,
  loginWithGoogle,
} = require("../../app/usecases/user/loginUser");
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
  const { name, email, phone, password } = req.body;
  if (req.body) {
    const validationErrors = validateSignupData(req.body);
    if (validationErrors.length > 0) {
      console.log(validationErrors);
      return res.status(400).json({ errors: validationErrors });
    }
  }

  try {
    const user = await sigupUser(userRepository)(name, email, phone, password);
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
      return res.status(400).json({ message: validationErrors });
    }
    const user = await loginUser(userRepository)(email, password);

    if (user) {
      const token = generateToken(user);
      res.status(200).json({ message: "login Successful", user, token });
    } else if (user === null) {
      console.log(user);
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const userLoginWithGoogle = async (req, res) => {
  try {
    const { email, name, picture } = req.body;

    const token = await loginWithGoogle(userRepository)(email, name, picture);
    if (token) {
      res.status(200).json({ message: "login Successful", token });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  UserRegister,
  UserLogin,
  userLoginWithGoogle,
};
