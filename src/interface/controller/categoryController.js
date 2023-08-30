const { insertCategory } = require("../../app/usecases/category/addCategory");
const {
  deletecategory,
} = require("../../app/usecases/category/deleteCategory");
const { getcategoryList } = require("../../app/usecases/category/getCategory");
const { CategoryById } = require("../../app/usecases/category/getCategoryById");
const {
  categoryUpdate,
} = require("../../app/usecases/category/updateCategory");
const { categoryModel } = require("../../infra/database/categoryModel");
const { CategoryRepoImp } = require("../../infra/repositories/categoryRepo");

const categoryDb = categoryModel;
const categoryRepo = CategoryRepoImp(categoryDb);

const addCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const createdCategory = await insertCategory(categoryRepo)(
      name,
      description,
      image
    );
    if (createdCategory) {
      res
        .status(201)
        .json({ message: "Category successfully added", createdCategory });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params;
    const category = req.body;
    const updatedCategory = await categoryUpdate(categoryRepo)(
      categoryId,
      category
    );
    if (updatedCategory) {
      res.status(201).json({ message: "Category successfully updated" });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const Categorylist = async (req, res) => {
  try {
    const allcategory = await getcategoryList(categoryRepo)({});
    if (allcategory) {
      res.status(200).json({ message: "all categorys", allcategory });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const categoryDelete = async (req, res) => {
  try {
    const categoryId = req.params;
    const deletedcategory = await deletecategory(categoryRepo)(categoryId);
    if (deletedcategory) {
      res.status(201).json({ message: "category successfully deleted" });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params;
    const Category = await CategoryById(categoryRepo)(categoryId);
    if (Category) {
      res
        .status(200)
        .json({ message: "category fetch successfully", Category });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addCategory,
  updateCategory,
  Categorylist,
  categoryDelete,
  getCategoryById,
};
