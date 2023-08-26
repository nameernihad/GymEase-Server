const insertLevel = (levelRepo) => async (name, description, image) => {
  const newLevel = {
    name,
    description,
    image,
  };
  const createdLevel = await levelRepo.Create(newLevel);
  return createdLevel;
};

module.exports = {
  insertLevel,
};
