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

  return {
    Create,
  };
};

module.exports = {
  workoutRepoImp,
};
