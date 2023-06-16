const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/stats', adminController.stats);
router.post('/login', adminController.loginAdmin)

module.exports = router;
