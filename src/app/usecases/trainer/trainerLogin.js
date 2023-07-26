const bcrypt = require("bcrypt");

const trainerLogin = (trainerRepo) => async (email, password) => {
  const trainer = await trainerRepo.trainerfind(email);
  if (trainer) {
    const isPasswordValid = await bcrypt.compare(password, trainer.password);
    if (isPasswordValid) {
      return trainer;
    }
  }
  return null;
};
module.exports = {
  trainerLogin,
};
