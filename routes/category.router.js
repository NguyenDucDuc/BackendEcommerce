const router = require('express').Router();
const categoryController = require('../controllers/category.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', categoryController.getAllCategories);
router.post('/', auth.verifyAdmin, categoryController.addCategory);

module.exports = router;
