const getcategoryList = (categoryRepo) => async () => {
  categorydetails = await categoryRepo.listcategory();
  return categorydetails;
};
module.exports = {
  getcategoryList,
};
