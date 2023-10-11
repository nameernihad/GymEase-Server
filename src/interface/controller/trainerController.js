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
const { subscriptionModel } = require("../../infra/database/subscriptionModel");
const {
  subscriptionRepoimpl,
} = require("../../infra/repositories/subscriptionRepo");
const { subDetials } = require("../../app/usecases/subscriptions/subDetails");
const { sendMultyMail } = require("../../services/sentMultyEmail");
const { UserRepoImpl } = require("../../infra/repositories/userRepo");

const db = UserModel;
const trainerDb = joinTrainerModal;
const subDb = subscriptionModel;

const trainerRepo = trainerRepoimpl(db);
const trainerDetails = joinTrainerRepoimpl(trainerDb);
const subscriptionRepo = subscriptionRepoimpl(subDb);
const userRepository = UserRepoImpl(db);

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
      res.status(401).json({ message: "you are not a trainer" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
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

const getSubscription = async (req, res) => {
  try {
    const trianerId = req.user._id;
    console.log(trianerId);
    const subscription = await subDetials(subscriptionRepo)(trianerId);
    if (subscription) {
      res
        .status(200)
        .json({ message: "subDetails fetched successfully", subscription });
    } else {
      res.status(401).json({ message: "something went wrong" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const sentEmails = async (req, res) => {
  try {
    console.log("kjhjhdkjd");
    const { userEmails, roomCode } = req.body;
    console.log(roomCode, "kjhkjsdhfkjh");
    const emailPromises = [];

    for (const email of userEmails) {
      const userData = await userRepository.findByemail(email);
      console.log(userData);
      const emailOptions = {
        to: userData.email,
        subject: "Video Call Room Code",
        html: `
          <p>Hello, ${userData.name}</p>
          <p>Your video call room code is: ${roomCode}</p>
          <p>Please click the link below to join the call:</p>
          <a href="http://localHost:3000/live-setion">Join Video Call</a>
        `,
      };

      const emailPromise = sendMultyMail(emailOptions);
      emailPromises.push(emailPromise);
    }

    // Wait for all emails to be sent
    const results = await Promise.all(emailPromises);

    res.status(200).json({ message: "Emails successfully sent", results });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error sending emails" });
  }
};

module.exports = {
  Login,
  getTrainerById,
  getSubscription,
  sentEmails,
};
