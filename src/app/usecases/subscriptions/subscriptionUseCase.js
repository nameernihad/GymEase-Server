const Subscription = (subscriptionRepo) => async (subData) => {
  const details = await subscriptionRepo.createSubscription(subData);
  return details;
};
module.exports = {
  Subscription,
};
