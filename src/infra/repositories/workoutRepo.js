const { workoutModel } = require("../database/workouts");

const workoutRepoImp = (workoutModel) => {
  const Create = async (workout) => {
    try {
      const createdWorkout = await workoutModel.create(workout);
      return createdWorkout.toObject();
    } catch (error) {
      console.log(error.message);
    }
  };

  const listWorkout = async () => {
    try {
      const workoutList = await workoutModel.find();
      return workoutList;
    } catch (error) {}
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

  return {
    Create,
    listWorkout,
    UpdateWorkout,
    deleteWorkout,
  };
};

module.exports = {
  workoutRepoImp,
};