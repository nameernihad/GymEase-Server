const allTrainers = (trainerRepo) => async () => {
  Trainerdetails = await trainerRepo.trainerDetails();
  console.log(Trainerdetails);
  return Trainerdetails;
};
module.exports = {
  allTrainers,
};
