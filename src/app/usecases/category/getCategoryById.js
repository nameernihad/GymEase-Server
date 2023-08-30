const CategoryById = (categoryRepo) => async (categoryId) => {
  const category = await categoryRepo.findById(categoryId);
  return category;
};

module.exports = {
  CategoryById,
};
