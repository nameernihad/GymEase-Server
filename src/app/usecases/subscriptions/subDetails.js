const subDetials = (subscriptionRepo) => async (trainerId) => {
  const details = await subscriptionRepo.findSubscription(trainerId);
  return details;
};

const totalAmount = (subscriptionRepo)=> async (trainerId)=>{
  const subAmount = await subscriptionRepo.calculateSubAmount(trainerId);
  return subAmount;
}

const findDurations = (subscriptionRepo)=> async (trainerId)=>{
  const countOfDuration = await subscriptionRepo.durationCount(trainerId);
  return countOfDuration;
} 

const allSubscriptions = (subscriptionRepo)=> async ()=>{
  const subData = await subscriptionRepo.getAllSubscriptions();
  return subData;
} 

module.exports = {
  subDetials,
  totalAmount,
  findDurations,
  allSubscriptions
};
