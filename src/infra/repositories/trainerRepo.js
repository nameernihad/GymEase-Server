const trainerRepoimpl = (userModel) => {
  const trainerfind = async (email) => {
    const trainer = await userModel.findOne({ email, isTrainer: true });
    return trainer ? trainer.toObject() : null;
  };

  const trainerDetails = async () => {
    const allTraners = await userModel.find({ isTrainer: true });
    console.log(allTraners);
    return allTraners;
  };

  return {
    trainerfind,
    trainerDetails,
  };
};

module.exports = {
  trainerRepoimpl,
};
