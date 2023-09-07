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

  const validation = async (validationDetails) => {
    try {
      const { detailsID, Status } = validationDetails;

      const newTrainerDetails = await newTrianerModel
        .findById(detailsID)
        .populate("user");

      if (!newTrainerDetails) {
        throw new Error("New trainer details not found");
      }

      newTrainerDetails.status = Status;

      if (Status === "approved") {
        newTrainerDetails.user.isTrainer = true;
      } else if (Status === "rejected") {
        newTrainerDetails.user.isTrainer = false;
      }

      await newTrainerDetails.save();
      await newTrainerDetails.user.save();
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  return {
    newTrainerRequest,
    getAllRequest,
    validation,
  };
};

module.exports = {
  joinTrainerRepoimpl,
};
