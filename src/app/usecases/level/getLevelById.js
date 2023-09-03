const LevelById = (LevelRepo) => async (LevelId) => {
  console.log(LevelId, "usestate");
  const Level = await LevelRepo.findById(LevelId);
  return Level;
};

module.exports = {
  LevelById,
};
