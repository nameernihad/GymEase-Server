const insertCategory = (CategoryRepo) => async (name, description, image) => {
  const newCategory = {
    name,
    description,
    image,
  };
  const createdCategory = await CategoryRepo.Create(newCategory);
  return createdCategory;
};

module.exports = {
  insertCategory,
};
