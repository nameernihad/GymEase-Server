const addRatings = (joinTrainerRepo) => async (rating,comment, trainerId, userId) => {
  const addRating = await joinTrainerRepo.addRatings(rating,comment, trainerId, userId);

  return {
    addRating,
  };
};
module.exports = {
  addRatings,
};
