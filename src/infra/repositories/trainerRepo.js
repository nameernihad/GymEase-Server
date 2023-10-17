const trainerRepoimpl = (userModel) => {
  const trainerfind = async (email) => {
    const trainer = await userModel.findOne({ email, isTrainer: true });
    return trainer ? trainer.toObject() : null;
  };

  const trainerDetails = async () => {
    const allTraners = await userModel.find({ isTrainer: true });
    return allTraners;
  };

  const updateTrainer = async (trainerData,trainerId) =>{
    try {
      const updatedTrainer = await userModel.findByIdAndUpdate(
        trainerId, 
        trainerData, 
        { new: true } 
      );
      if (!updatedTrainer) {
        return null;
      }
      return updatedTrainer;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return {
    trainerfind,
    trainerDetails,
    updateTrainer,
  };
};

module.exports = {
  trainerRepoimpl,
};
