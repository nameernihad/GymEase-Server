const {
  updateWorkouts,
  WorkoutList,
  deleteWorkout,
  findWorkout,
} = require("../../app/usecases/workout/workout");
const { insertWorkout } = require("../../app/usecases/workout/workout");
const { workoutModel } = require("../../infra/database/workouts");
const { workoutRepoImp } = require("../../infra/repositories/workoutRepo");

const workoutdb = workoutModel;
const workoutRepo = workoutRepoImp(workoutdb);

const AddWorkout = async (req, res) => {
  try {
    const { name, description, category, level, gif, count, timer } = req.body;
    const createdWorkout = await insertWorkout(workoutRepo)(
      name,
      description,
      category,
      level,
      gif,
      count,
      timer
    );
    if (createdWorkout) {
      res
        .status(201)
        .json({ message: "workout successfully added", createdWorkout });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const WorkoutlistController = async (req, res) => {
  try {
    const workout = await WorkoutList(workoutRepo)();
    if (workout) {
      res.status(200).json({ workout });
    }
  } catch (error) {}
};

const UpdateWorkout = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const { name, description, category, Level, gif, count, timer } = req.body;

    const updateData = {
      name,
      description,
      category,
      Level,
      gif,
      count,
      timer,
    };

    const updatedWorkout = await updateWorkouts(workoutRepo)(
      workoutId,
      updateData
    );

    if (updatedWorkout) {
      res
        .status(200)
        .json({ message: "Workout successfully updated", updatedWorkout });
    } else {
      res.status(404).json({ message: "Workout not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const WorkoutDelete = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const deletedWorkout = await deleteWorkout(workoutRepo)(workoutId);
    if (deletedWorkout) {
      res
        .status(201)
        .json({ message: "Workout Successfully deleted", deleteWorkout });
    } else {
      res.status(500).json({ message: "something went wrong" });
    }
  } catch (error) {
    console.log(error.message, "hgdgc");
    res.status(500).json({ message: error.message });
  }
};
const filterWorkout = async (req, res) => {
  try {
    const fiters = req.params;
    const filteredWorkout = await findWorkout(workoutRepo)(fiters);
    if (filterWorkout) {
      res
        .status(200)
        .json({ message: "workout filtered Successfully", filteredWorkout });
    }
  } catch (error) {}
};

module.exports = {
  AddWorkout,
  WorkoutlistController,
  UpdateWorkout,
  WorkoutDelete,
  filterWorkout,
};
