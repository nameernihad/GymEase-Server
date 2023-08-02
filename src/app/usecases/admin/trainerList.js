const TrainerList = (trainerRepo) => async () => {
  Trainerdetails = await trainerRepo.trainerDetails();
  return Trainerdetails;
};
module.exports = {
  TrainerList,
};
