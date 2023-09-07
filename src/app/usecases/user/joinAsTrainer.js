const joinTrainer = (joinTrainerRepo) => async (joinTrainerData) => {
  const joinAsTrainer = await joinTrainerRepo.newTrainerRequest(
    joinTrainerData
  );
  return joinAsTrainer;
};
module.exports = {
  joinTrainer,
};
