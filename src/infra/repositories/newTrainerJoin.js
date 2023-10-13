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
  
      const allTrainers = requestedUsers.filter((user) => user.user && user.user.isTrainer === true);
  
      return allTrainers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  

  const addRatings = async (ratingValue,commentValue, trainerId, userId) => {
    try {
      const trainer = await newTrianerModel.findById(trainerId);

      if (!trainer) {
        throw new Error("Trainer not found");
      }

      const existingRating = trainer.ratings.find(
        (r) => r.user.toString() === userId.toString()
      );

      if (existingRating) {
        throw new Error("User has already rated this trainer");
      }

      const newRating = {
        user: userId,
        rating: ratingValue,
      };
      const newComment = {
        user:userId,
        commentText:commentValue
      }
      
      trainer.comments.push(newComment)
      trainer.ratings.push(newRating);

      const totalRatings = trainer.ratings.length;
      const sumRatings = trainer.ratings.reduce(
        (total, r) => total + r.rating,
        0
      );
      trainer.avgRating = totalRatings > 0 ? sumRatings / totalRatings : 0;

      await trainer.save();
      return trainer;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getTrainerId = async (trainerId) => {
    try {
      console.log(trainerId);
      const trainer = await newTrianerModel
        .findById(trainerId)
        .populate("user")
        .exec();
      if (!trainer) {
        throw new Error("Trainer not found");
      } else {
        return trainer;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getTrainerDetailsById = async (trainerId) => {
    try {
      console.log(trainerId);
      const trainer = await newTrianerModel
        .findOne({ user: trainerId })
        .populate("user")
        .exec();

      if (!trainer) {
        throw new Error("Trainer not found");
      } else {
        return trainer;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    newTrainerRequest,
    getAllRequest,
    validation,
    trainerDetails,
    addRatings,
    getTrainerId,
    getTrainerDetailsById,
  };
};

module.exports = {
  joinTrainerRepoimpl,
};
