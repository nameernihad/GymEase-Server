const { workoutModel } = require("../database/workouts");

const workoutRepoImp = (workoutModel) => {
  const Create = async (workout) => {
    try {
      const createdWorkout = await workoutModel.create(workout);
    } catch (error) {
      console.log(error.message);
    }
  };

  const listWorkout = async () => {
    try {
      const workoutList = await workoutModel
        .find()
        .populate("level") // Populate the 'level' field
        .populate("category") // Populate the 'category' field
        .exec();

      return workoutList;
    } catch (error) {
      // Handle the error
      console.error(error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  const UpdateWorkout = async (workoutId, updateData) => {
    try {
      const updatedWorkout = await workoutModel.findByIdAndUpdate(
        workoutId,
        updateData
      );
      return updatedWorkout;
    } catch (error) {
      console.log(error.message);
      throw new Error("Failed to update workout.");
    }
  };

  const deleteWorkout = async (workoutId) => {
    try {
      const WorkoutDelete = await workoutModel.findByIdAndDelete(workoutId);
      return WorkoutDelete;
    } catch (error) {
      console.log(error.message);
      throw new Error("Failed to delete workout.");
    }
  };
  const filterWorkout = async (filters) => {
    try {
      const { levelId, categoryId } = filters;
      const workouts = await workoutModel
        .find({
          level: levelId,
          category: categoryId,
        })
        .populate("level")
        .populate("category")
        .exec();

      return workouts;
    } catch (error) {
      console.log(error.message);
      throw new Error("Failed to find workout.");
    }
  };

  return {
    Create,
    listWorkout,
    UpdateWorkout,
    deleteWorkout,
    filterWorkout,
  };
};

module.exports = {
  workoutRepoImp,
};
