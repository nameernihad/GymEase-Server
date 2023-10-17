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
const trainerUpdate =  (trainerRepo)=> async (trainerData,trainerId)=>{
  const updatedTrainer = await trainerRepo.updateTrainer(trainerData,trainerId)
  if(updatedTrainer){
    return updatedTrainer
  }
}
module.exports = {
  trainerLogin,
  trainerUpdate
};
