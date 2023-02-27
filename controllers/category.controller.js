const categoryService = require('../services/category.service');

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const { code, data } = await categoryService.getAllCategories();
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
  addCategory: async (req, res) => {
    const category = req.body;
    if (req.files) {
      category.image = req.files.image;
    }
    category.createdAt = new Date();
    category.updatedAt = new Date();
    try {
      const { code, data } = await categoryService.addCategory(category);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
