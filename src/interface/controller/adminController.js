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
const { workoutRepoImp } = require("../../infra/repositories/workoutRepo");

const { workoutModel } = require("../../infra/database/workouts");
const {
  joinTrainerRepoimpl,
} = require("../../infra/repositories/newTrainerJoin");
const joinTrainerModal = require("../../infra/database/trainerDetails");
const {
  showRequests,
} = require("../../app/usecases/newTrainer/getAllRequests");
const {
  validation,
} = require("../../app/usecases/newTrainer/trainerValidation");

const db = UserModel;
const workoutdb = workoutModel;
const trainerDb = joinTrainerModal;

const adminRepo = adminRepoimpl(db);
const userRepo = UserRepoImpl(db);
const trainerRepo = trainerRepoimpl(db);
const joinTrianerRepo = joinTrainerRepoimpl(trainerDb);

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const validationErrors = validateLoginData(req.body);

    const admin = await adminLogin(adminRepo)(email, password);

    if (admin) {
      const token = generateToken(admin, process.env.ADMIN_SECRET_KEY);
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
    const userList = await UserList(userRepo)({});
    if (userList) {
      res.status(200).json({ userList });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UserBlocking = async (req, res) => {
  try {
    const { userId } = req.params;
    const status = await BockUser(userRepo)(userId);
    if (status) {
      res.status(201).json({ message: "User Successfully blocked", status });
    } else {
      res.status(201).json({ message: "user UnBlocked", status });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const TrainerlistController = async (req, res) => {
  try {
    const Trainerdetails = await TrainerList(trainerRepo)({});
    if (Trainerdetails) {
      res.status(200).json({ Trainerdetails });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UserSingleView = async (req, res) => {
  try {
    const id = req.params.userId;
    const userview = await showUserById(userRepo)(id);
    if (userview) {
      res.status(200).json({ userview });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const trainerRequest = async (req, res) => {
  try {
    const allTrainerRequest = await showRequests(joinTrianerRepo)();
    if (allTrainerRequest) {
      res.status(200).json({
        message: "all request successfully fetched",
        allTrainerRequest,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const requestValidtion = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you have the ID of newTrainerDetails
    const { status } = req.body;
    validaionDetails = {
      detailsID: id,
      Status: status,
    };

    const validated = await validation(joinTrianerRepo)(validaionDetails);
    if (validated) {
      res
        .status(202)
        .json({ message: "Status successfully updated", validated });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  Login,
  UserListController,
  UserBlocking,
  TrainerlistController,
  UserSingleView,
  trainerRequest,
  requestValidtion,
};
