const { addRatings } = require("../../app/usecases/newTrainer/addRating");
const { getTrainer } = require("../../app/usecases/newTrainer/trainerById");
const {
  Subscription,
} = require("../../app/usecases/subscriptions/subscriptionUseCase");
const { allTrainers } = require("../../app/usecases/user/getAllTrainer");
const { joinTrainer } = require("../../app/usecases/user/joinAsTrainer");
const {
  loginUser,
  loginWithGoogle,
} = require("../../app/usecases/user/loginUser");
const { signupUser } = require("../../app/usecases/user/signupUser");
const { singleUser } = require("../../app/usecases/user/singleUser");
const { userUpdate } = require("../../app/usecases/user/updateUser");
const {
  validateSignupData,
  validateLoginData,
} = require("../../domain/entities/userValidation");
const { subscriptionModel } = require("../../infra/database/subscriptionModel");
const joinTrainerModal = require("../../infra/database/trainerDetails");
const { UserModel } = require("../../infra/database/userModel");

const {
  joinTrainerRepoimpl,
} = require("../../infra/repositories/newTrainerJoin");
const {
  subscriptionRepoimpl,
} = require("../../infra/repositories/subscriptionRepo");
const { trainerRepoimpl } = require("../../infra/repositories/trainerRepo");
const { UserRepoImpl } = require("../../infra/repositories/userRepo");
const { generateToken } = require("../middleware/authToken");

const db = UserModel;
const trainerDb = joinTrainerModal;
const subscripriptionDb = subscriptionModel;

const userRepository = UserRepoImpl(db);
const trainerRepo = trainerRepoimpl(db);
const joinTrianerRepo = joinTrainerRepoimpl(trainerDb);

const subscriptionRepo = subscriptionRepoimpl(subscripriptionDb);

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
      console.log(user);
      const token = generateToken(user, process.env.USER_SECRET_KEY);
      console.log(token);
      res.status(200).json({ message: "Login Successful", user, token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Something went wrong" });
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

const singleView = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);
    const user = await singleUser(userRepository)(userId);
    if (user) {
      res.status(200).json({ message: "singeView of User loaded", user });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const userDetails = req.body;
    const userId = req.params;
    console.log(userDetails, userId);
    const updatedUser = await userUpdate(userRepository)(userId, userDetails);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating user" });
  }
};

const getTrainers = async (req, res) => {
  try {
    const Trainerdetails = await allTrainers(joinTrianerRepo)({});
    console.log(Trainerdetails);
    if (Trainerdetails) {
      res.status(200).json({ Trainerdetails });
    }
  } catch (error) {
    console.log(error.message, "trainer catch");
  }
};
const joinAsTrainer = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      about,
      experience,
      certifications,
      experienceDetails,
      profilePhoto,
      coverPhoto,
      paymentDetails,
      gender,
    } = req.body;

    const trainerRequest = {
      user: userId,

      about,
      experience,
      certifications,
      experienceDetails,
      profilePhoto,
      coverPhoto,
      paymentDetails,
      gender,
    };

    const newTrainer = await joinTrainer(joinTrianerRepo)(trainerRequest);
    if (newTrainer) {
      res.status(201).json({
        message: "Trainer request successfully submitted",
        newTrainer,
      });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addRating = async (req, res) => {
  try {
    // const userId = req.user._id;
    const trainerId = req.params.trainerId;
    const userId = req.params.userId;
    const rating = req.body.rating;

    const ratings = await addRatings(joinTrianerRepo)(
      rating,
      trainerId,
      userId
    );
    console.log(ratings);
    if (ratings) {
      res
        .status(200)
        .json({ message: "Rating Successfully Submitted", ratings });
      S;
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getTrainerById = async (req, res) => {
  try {
    const trainerId = req.params.Id;
    const trainer = await getTrainer(joinTrianerRepo)(trainerId);
    if (trainer) {
      res
        .status(200)
        .json({ message: "trianer successfully fetched", trainer });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const subscriptionController = async (req, res) => {
  try {
    const userId = req.user._id;
    const trainerId = req.params.trainerId;
    const { duration, amount } = req.body;
    const subData = {
      user: userId,
      trainer: trainerId,
      duration,
      amount,
    };

    const createdSubscription = await Subscription(subscriptionRepo)(subData);

    return res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: createdSubscription,
    });
  } catch (error) {
    // Handle errors (e.g., send an error response to the client)
    console.error("Error creating subscription:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  UserRegister,
  UserLogin,
  userLoginWithGoogle,
  singleView,
  updateUser,
  getTrainers,
  joinAsTrainer,
  addRating,
  getTrainerById,
  subscriptionController,
};
