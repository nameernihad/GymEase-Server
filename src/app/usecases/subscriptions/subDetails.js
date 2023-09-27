const subDetials = (subscriptionRepo) => async (trainerId) => {
  const details = await subscriptionRepo.findSubscription(trainerId);
  return details;
};
module.exports = {
  subDetials,
};
