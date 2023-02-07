const { dataRouter } = require('./data.router')
const { sellerRouter } = require('./seller.router')
const { userRouter } = require('./user.router')
const { sellerRouter } = require('./seller.router');
const { userRouter } = require('./user.router');
const productRouter = require('./product.router');

const indexRouter = require('express').Router();

indexRouter.use("/user", userRouter)
indexRouter.use("/seller", sellerRouter)
indexRouter.use("/data", dataRouter)
indexRouter.use('/user', userRouter);
indexRouter.use('/seller', sellerRouter);
indexRouter.use('/product', productRouter);

module.exports = { indexRouter };
