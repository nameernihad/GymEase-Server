const joinTrainerRepoimpl = (newTrianerModel) => {
  const newTrainerRequest = async (user) => {
    try {
      const joinAsTrainer = await newTrianerModel.create(user);
      return joinAsTrainer.toObject();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllRequest = async () => {
    try {
      const allRequests = await newTrianerModel.find();
      return allRequests;
    } catch (error) {
      console.log(error.message);
    }
  };
  return {
    newTrainerRequest,
    getAllRequest,
  };
};

module.exports = {
  joinTrainerRepoimpl,
};
