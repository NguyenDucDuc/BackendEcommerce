const stripeService = require("../services/stripe.service");

const stripe = require("stripe")(process.env.STRIPE_KEY);

module.exports = {
  payment: async (req, res, next) => {
    try {
      // const token = await stripeService.createToken({ card: req.body.card });
      const stripeRes = await stripe.charges.create({
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "vnd",
      });
      return res.status(200).json(stripeRes);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
  refund: async (req, res, next) => {
    try {
      const stripeRes = await stripe.refunds.create({
        charge: req.body.chargeId,
      });
      return res.status(200).json(stripeRes);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
  retrieveCustomer: async (req, res, next) => {
    console.log(req.params);
    try {
      const stripeRes = await stripeService.retrieveCustomer({
        customerId: req.params.id,
      });
      return res.status(200).json(stripeRes);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
};
