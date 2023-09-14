const allTrainers = (joinTrianerRepo) => async () => {
  Trainerdetails = await joinTrianerRepo.trainerDetails();
  return Trainerdetails;
};
module.exports = {
  allTrainers,
};
