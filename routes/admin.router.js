const router = require('express').Router();
const adminController = require('../controllers/admin.controller');

router.post('/stats', adminController.stats);

module.exports = router;
