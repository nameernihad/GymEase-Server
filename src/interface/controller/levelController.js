const { insertLevel } = require("../../app/usecases/level/addLevel");
const { deleteLevel } = require("../../app/usecases/level/deleteLevel");
const { getLevelList } = require("../../app/usecases/level/getLevel");
const { LevelById } = require("../../app/usecases/level/getLevelById");
const { levelUpdate } = require("../../app/usecases/level/updateLevel");
const { levelModel } = require("../../infra/database/levelModel");
const { levelRepoImp } = require("../../infra/repositories/LevelRepo");

const levelDb = levelModel;
const levelRepo = levelRepoImp(levelDb);

const addLevel = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const createdLevel = await insertLevel(levelRepo)(name, description, image);
    if (createdLevel) {
      res
        .status(201)
        .json({ message: "level successfully added", createdLevel });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updatelevel = async (req, res) => {
  try {
    const levelId = req.params;
    console.log(levelId);
    const level = req.body;
    const updatedlevel = await levelUpdate(levelRepo)(levelId, level);
    if (updatedlevel) {
      res.status(201).json({ message: "level successfully updated" });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const levelList = async (req, res) => {
  try {
    const allLevel = await getLevelList(levelRepo)({});
    if (allLevel) {
      res.status(200).json({ message: "all levels", allLevel });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const levelDelete = async (req, res) => {
  try {
    const levelId = req.params;
    const deletedLevel = await deleteLevel(levelRepo)(levelId);
    if (deletedLevel) {
      res.status(201).json({ message: "level successfully deleted" });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getLevelById = async (req, res) => {
  try {
    const LevelId = req.params;
    console.log(LevelId, "controll");
    const Level = await LevelById(levelRepo)(LevelId);
    if (Level) {
      res.status(200).json({ message: "Level fetch successfully", Level });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addLevel,
  updatelevel,
  levelList,
  levelDelete,
  getLevelById,
};
