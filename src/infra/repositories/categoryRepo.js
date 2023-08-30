const CategoryRepoImp = (CategoryModel) => {
  const Create = async (Category) => {
    try {
      const createdCategory = await CategoryModel.create(Category);
      return createdCategory.toObject();
    } catch (error) {
      console.log(error.message);
    }
  };
  const updateCategory = async (Id, Category) => {
    const id = Id.categoryId;
    const { name, description, image } = Category;
    try {
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        { _id: id },
        { name, description, image }
      );
      return updatedCategory.toObject();
    } catch (error) {
      console.log(error.message);
    }
  };
  const listcategory = async () => {
    try {
      const allcategory = await CategoryModel.find();
      return allcategory;
    } catch (error) {
      console.log(error.message);
    }
  };
  const categorydelete = async (categoryId) => {
    try {
      id = categoryId.categoryId;
      const deletecategory = await CategoryModel.findByIdAndDelete({ _id: id });
      return deletecategory;
    } catch (error) {
      console.log(error.message);
    }
  };
  const findById = async (categoryId) => {
    try {
      id = categoryId.categoryId;
      const fechdata = await CategoryModel.findById({ _id: id });
      return fechdata;
    } catch (error) {
      console.log(error.message);
    }
  };
  return {
    Create,
    updateCategory,
    listcategory,
    categorydelete,
    findById,
  };
};

module.exports = {
  CategoryRepoImp,
};
