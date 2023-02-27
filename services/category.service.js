const db = require('../models');
const { Op } = require('sequelize');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: 'de5pwc5fq',
  api_key: '747993572847511',
  api_secret: 'Mw8_L682h95W9Wu_ixd8hg92rj0',
});

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
      if(category.image){
        const result = await cloudinary.uploader.upload(
          category.image.tempFilePath,
          {
            public_id: `${new Date().getTime()}`,
            resource_type: 'auto',
            folder: 'CategoryImage',
          }
        );
        category.image = result.secure_url;
      }
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
