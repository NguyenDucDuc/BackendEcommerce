const stripe = require("stripe")(process.env.STRIPE_KEY);
module.exports = {
  createToken: async ({ card }) => {
    try {
      const token = await stripe.tokens.create({
        card,
      });
      return token;
    } catch (error) {
      console.log(error);
    }
  },
  createCustomer: async ({ email }) => {
    try {
      const customer = await stripe.customers.create({
        description:
          "My First Test Customer (created for API docs at https://www.stripe.com/docs/api)",
        email: email,
      });
      return customer;
    } catch (error) {
      console.log(error);
    }
  },
  retrieveCustomer: async ({ customerId }) => {
    try {
      const customer = await stripe.customers.retrieve(customerId);
      return customer;
    } catch (error) {
      console.log(error);
    }
  },
};
