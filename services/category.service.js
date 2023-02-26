const db = require('../models');
const { Op } = require('sequelize');

const categoryService = {
  getAllCategories: async () => {
    try {
      const categories = await db.Category.findAll({
        where: {
          id: {
            [Op.not]: 1,
          },
        },
      });
      return {
        code: 200,
        data: {
          status: 200,
          data: categories,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: 400,
        data: {
          status: 400,
          message: 'Đã có lỗi xảy ra',
        },
      };
    }
  },
  addCategory: async (category) => {
    const transaction = await db.sequelize.transaction();
    try {
      const newCategory = await db.Category.create(category, {
        transaction: transaction,
      });
      const categoryParent = await db.Category.findByPk(category.parentId);

      newCategory.path = `${categoryParent.path}/${newCategory.id}`;
      newCategory.level = newCategory.path.split('/').length - 1;

      await transaction.commit();
      await newCategory.save();
      return {
        code: 200,
        data: {
          status: 200,
          data: newCategory,
          message: 'Đã thêm thành công',
        },
      };
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return {
        code: 400,
        data: {
          status: 400,
          message: 'Đã có lỗi xảy ra',
        },
      };
    }
  },

  getListCategoryVaild: async (category) => {
    return category.path.split('/').filter((item) => item >= category.id);
  },
};

module.exports = categoryService;
