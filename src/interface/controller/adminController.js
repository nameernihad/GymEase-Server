const { validateLoginData } = require("../../domain/entities/userValidation");
const { UserModel } = require("../../infra/database/userModel");
const { adminRepoimpl } = require("../../infra/repositories/adminRepo");
const { adminLogin } = require("../../app/usecases/admin/adminLogin");
const { generateToken } = require("../middleware/authToken");
const { UserRepoImpl } = require("../../infra/repositories/userRepo");
const {
  UserList,
  BockUser,
  showUserById,
} = require("../../app/usecases/admin/userList");
const { trainerRepoimpl } = require("../../infra/repositories/trainerRepo");
const { TrainerList } = require("../../app/usecases/admin/trainerList");

const db = UserModel;

const adminRepo = adminRepoimpl(db);
const userRepo = UserRepoImpl(db);
const trainerRepo = trainerRepoimpl(db);

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

const UserListController = async (req, res) => {
  try {
    const userList = await UserList(userRepo)();
    if (userList) {
      res.status(200).json({ userList });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const UserBlocking = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;
    const userUpdate = await BockUser(userRepo)(userId, status);

    if (userUpdate) {
      if (status === "Block") {
        res.status(201).json({ message: "User Blocked" });
      } else if (status === "Unblock") {
        res.status(201).json({ message: "User UnBlocked" });
      }
    }
  } catch (error) {
    console.log(error.message, "catch");
    res.status(500).json({ message: "internel server error" });
  }
};

const TrainerlistController = async (req, res) => {
  try {
    const Trainerdetails = await TrainerList(trainerRepo)();
    if (Trainerdetails) {
      res.status(200).json({ Trainerdetails });
    }
  } catch (error) {
    console.log(error.message, "trainer catch");
  }
};

const UserSingleView = async (req, res) => {
  try {
    const id = req.params.userId;
    console.log(id, "cont");
    const userview = await showUserById(userRepo)(id);
    if (userview) {
      res.status(200).json({ userview });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  Login,
  UserListController,
  UserBlocking,
  TrainerlistController,
  UserSingleView,
};
