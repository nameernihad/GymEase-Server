const {
  loginUser,
  loginWithGoogle,
} = require("../../app/usecases/user/loginUser");
const { signupUser } = require("../../app/usecases/user/signupUser");
const {
  validateSignupData,
  validateLoginData,
} = require("../../domain/entities/userValidation");
const { UserModel } = require("../../infra/database/userModel");
const { UserRepoImpl } = require("../../infra/repositories/userRepo");
const { generateToken } = require("../middleware/authToken");

const db = new UserModel();

const userRepository = UserRepoImpl(db);

const UserRegister = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const validationErrors = await validateSignupData(
      name,
      email,
      phone,
      password
    );

    if (validationErrors) {
      return res.status(400).json({ message: validationErrors });
    }

    const user = await signupUser(userRepository)(name, email, phone, password);

    if (!user) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    return res.status(201).json({ message: "Signup successful", user });
  } catch (error) {
    console.log(error.message);

    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Somthing went wrong" });
  }
};

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validationErrors = validateLoginData(req.body);

    const user = await loginUser(userRepository)(email, password);

    if (user) {
      const token = generateToken(user);
      res.status(200).json({ message: "Login Successful", user, token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Somthing went wrong" });
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
