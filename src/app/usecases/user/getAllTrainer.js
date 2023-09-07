const allTrainers = (trainerRepo) => async () => {
  Trainerdetails = await trainerRepo.trainerDetails();
  return Trainerdetails;
};
module.exports = {
  allTrainers,
};
