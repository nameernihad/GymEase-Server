const { validateLoginData } = require("../../domain/entities/userValidation");
const { UserModel } = require("../../infra/database/userModel");
const joinTrainerModal = require("../../infra/database/trainerDetails");
const { trainerRepoimpl } = require("../../infra/repositories/trainerRepo");
const { trainerLogin } = require("../../app/usecases/trainer/trainerLogin");
const { generateToken } = require("../middleware/authToken");
const {
  joinTrainerRepoimpl,
} = require("../../infra/repositories/newTrainerJoin");
const { getTrainerId } = require("../../app/usecases/newTrainer/trainerById");

const db = UserModel;
const trainerDb = joinTrainerModal;

const trainerRepo = trainerRepoimpl(db);
const trainerDetails = joinTrainerRepoimpl(trainerDb);

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const validationErrors = validateLoginData(req.body);

    const trainer = await trainerLogin(trainerRepo)(email, password);

    if (trainer) {
      const token = generateToken(trainer, process.env.TRAINER_SECRET_KEY);
      res.status(200).json({ message: "login Successful", trainer, token });
    } else {
      res.status(401).json({ message: "you are not an trainer" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTrainerById = async (req, res) => {
  try {
    const trainerId = req.user._id;
    console.log(trainerId);
    const trainer = await getTrainerId(trainerDetails)(trainerId);
    if (trainer) {
      console.log(trainer);
      res
        .status(200)
        .json({ message: "Trainer fetched successfully", trainer });
    } else {
      res.status(401).json({ message: "something went wrong  " });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  Login,
  getTrainerById,
};
