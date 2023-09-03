const insertWorkout =
  (workoutRepo) =>
  async (name, description, category, Level, gif, count, timer) => {
    const newWorkout = {
      name,
      description,
      category,
      Level,
      gif,
      count,
      timer,
    };
    const createdUser = await workoutRepo.Create(newWorkout);
    return createdUser;
  };

const WorkoutList = (workoutRepo) => async () => {
  workoutdetails = await workoutRepo.listWorkout();
  return workoutdetails;
};

const updateWorkouts = (workoutRepo) => async (workoutId, updateData) => {
  try {
    const updatedWorkout = await workoutRepo.UpdateWorkout(
      workoutId,
      updateData
    );

    return updatedWorkout;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to update workout.");
  }
};

const deleteWorkout = (workoutRepo) => async (workoutId) => {
  try {
    const deletedWorkout = await workoutRepo.deleteWorkout(workoutId);
    return deletedWorkout;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to update workout.");
  }
};
const findWorkout = (workoutRepo) => async (filters) => {
  try {
    const filtered = await workoutRepo.filterWorkout(filters);
    return filtered;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to find workout.");
  }
};

module.exports = {
  WorkoutList,
  updateWorkouts,
  insertWorkout,
  deleteWorkout,
  findWorkout,
};
