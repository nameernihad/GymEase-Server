const getTrainer = (joinTrainerRepo) => async (trainerId) => {
  const singleTrainer = await joinTrainerRepo.getTrainerId(trainerId);

  return {
    singleTrainer,
  };
};
const getTrainerId = (joinTrainerRepo) => async (trainerId) => {
  const trainerDetailsById = await joinTrainerRepo.getTrainerDetailsById(
    trainerId
  );
  return {
    trainerDetailsById,
  };
};
module.exports = {
  getTrainer,
  getTrainerId,
};
