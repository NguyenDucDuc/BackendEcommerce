const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/stats', auth.verifyAdmin, adminController.stats);

module.exports = router;
