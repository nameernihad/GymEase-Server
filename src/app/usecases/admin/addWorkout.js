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

module.exports = {
  insertWorkout,
};
