const addRatings = (joinTrainerRepo) => async (rating, trainerId, userId) => {
  const addRating = await joinTrainerRepo.addRatings(rating, trainerId, userId);

  return {
    addRating,
  };
};
module.exports = {
  addRatings,
};
