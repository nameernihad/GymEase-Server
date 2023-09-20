const getTrainer = (joinTrainerRepo) => async (trainerId) => {
  const singleTrainer = await joinTrainerRepo.getTrainerId(trainerId);

  return {
    singleTrainer,
  };
};
module.exports = {
  getTrainer,
};
