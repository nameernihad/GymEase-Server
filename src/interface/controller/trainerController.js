const { validateLoginData } = require("../../domain/entities/userValidation");
const { UserModel } = require("../../infra/database/userModel");
const { trainerRepoimpl } = require("../../infra/repositories/trainerRepo");
const { trainerLogin } = require("../../app/usecases/trainer/trainerLogin");
const { generateToken } = require("../middleware/authToken");

const db = UserModel;

const trainerRepo = trainerRepoimpl(db);

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validationErrors = validateLoginData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const trainer = await trainerLogin(trainerRepo)(email, password);

    if (trainer) {
      const token = generateToken(trainer);
      res.status(200).json({ message: "login Successful", trainer, token });
    } else {
      res.status(401).json({ message: "you are not an trainer" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  Login,
};
