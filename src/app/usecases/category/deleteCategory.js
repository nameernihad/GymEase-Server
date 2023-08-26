const deletecategory = (categoryRepo) => async (categoryId) => {
  deletedcategory = await categoryRepo.categorydelete(categoryId);
  return deletedcategory;
};

module.exports = {
  deletecategory,
};
