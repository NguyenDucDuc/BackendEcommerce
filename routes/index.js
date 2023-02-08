const { dataRouter } = require('./data.router')
const { reportRouter } = require('./report.router')
const { sellerRouter } = require('./seller.router')
const { shopRouter } = require('./shop.router')
const { userRouter } = require('./user.router')

const indexRouter = require('express').Router()

indexRouter.use("/user", userRouter)
indexRouter.use("/seller", sellerRouter)
indexRouter.use("/data", dataRouter)
indexRouter.use("/shop", shopRouter)
indexRouter.use("/report", reportRouter)

module.exports = {indexRouter}