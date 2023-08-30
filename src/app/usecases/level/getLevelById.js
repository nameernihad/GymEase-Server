const LevelById = (LevelRepo) => async (LevelId) => {
  const Level = await LevelRepo.findById(LevelId);
  return Level;
};

module.exports = {
  LevelById,
};
