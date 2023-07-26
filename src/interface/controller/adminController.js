const { validateLoginData } = require("../../domain/entities/userValidation");
const { UserModel } = require("../../infra/database/userModel");
const { adminRepoimpl } = require("../../infra/repositories/adminRepo");
const { adminLogin } = require("../../app/usecases/admin/adminLogin");
const { generateToken } = require("../middleware/authToken");

const db = UserModel;

const adminRepo = adminRepoimpl(db);

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validationErrors = validateLoginData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const admin = await adminLogin(adminRepo)(email, password);

    if (admin) {
      const token = generateToken(admin);
      res.status(200).json({ message: "login Successful", admin, token });
    } else {
      res.status(401).json({ message: "you are not an admin" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  Login,
};
