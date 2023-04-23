const stripeController = require('../controllers/stripe.contoller');
const router = require('express').Router();

router.post('/payment', stripeController.payment);
router.post('/refund', stripeController.refund)
router.get('/customers/:id', stripeController.retrieveCustomer)

module.exports = router;
