const levelUpdate = (levelRepo) => async (userId, newLevel) => {
  console.log(userId, newLevel);
  const createdlevel = await levelRepo.updatelevel(userId, newLevel);
  return createdlevel;
};

module.exports = {
  levelUpdate,
};
