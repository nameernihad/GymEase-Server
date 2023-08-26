const deleteLevel = (levelRepo) => async (levelId) => {
  deletedLevel = await levelRepo.leveldelete(levelId);
  return deletedLevel;
};

module.exports = {
  deleteLevel,
};
