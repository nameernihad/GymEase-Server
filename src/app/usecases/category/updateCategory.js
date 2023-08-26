const categoryUpdate = (CategoryRepo) => async (userId, newLevel) => {
  console.log(userId, newLevel);
  const createdCategory = await CategoryRepo.updateCategory(userId, newLevel);
  return createdCategory;
};

module.exports = {
  categoryUpdate,
};
