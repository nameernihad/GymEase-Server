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
      const allRequests = await newTrianerModel.find().populate("user");
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

      if (Status === "approve") {
        newTrainerDetails.user.isTrainer = true;
      } else if (Status === "reject") {
        newTrainerDetails.user.isTrainer = false;
      } else if (Status === "pending") {
        newTrainerDetails.user.isTrainer = false;
      }

      await newTrainerDetails.save();
      await newTrainerDetails.user.save();
      return newTrainerDetails;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  const trainerDetails = async () => {
    try {
      const requestedUsers = await newTrianerModel
        .find()
        .populate("user")
        .exec();

      const allTraners = requestedUsers.filter(
        (user) => user.user.isTrainer === true
      );

      return allTraners;
    } catch (error) {
      // Handle errors here
      console.error(error);
      throw error; // You can handle or re-throw the error as needed
    }
  };

  return {
    newTrainerRequest,
    getAllRequest,
    validation,
    trainerDetails,
  };
};

module.exports = {
  joinTrainerRepoimpl,
};
