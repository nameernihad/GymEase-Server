const getLevelList = (levelRepo) => async () => {
  leveldetails = await levelRepo.listLevel();
  return leveldetails;
};
module.exports = {
  getLevelList,
};
