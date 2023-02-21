const { dataRouter } = require('./data.router')
const { notificationRouter } = require('./notification.router')
const { reportRouter } = require('./report.router')
const { sellerRouter } = require('./seller.router')
const { shopRouter } = require('./shop.router')
const { staffRouter } = require('./staff.router')
const { userRouter } = require('./user.router')
const productRouter = require('./product.router');

const indexRouter = require('express').Router();

indexRouter.use("/user", userRouter)
indexRouter.use("/seller", sellerRouter)
indexRouter.use("/data", dataRouter)
indexRouter.use('/product', productRouter);
indexRouter.use("/shop", shopRouter)
indexRouter.use("/report", reportRouter)
indexRouter.use("/notification", notificationRouter)
indexRouter.use("/staff", staffRouter)

module.exports = { indexRouter };
