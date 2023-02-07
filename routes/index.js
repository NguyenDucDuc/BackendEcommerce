const { dataRouter } = require('./data.router')
const { sellerRouter } = require('./seller.router')
const { userRouter } = require('./user.router')

const indexRouter = require('express').Router()

indexRouter.use("/user", userRouter)
indexRouter.use("/seller", sellerRouter)
indexRouter.use("/data", dataRouter)

module.exports = {indexRouter}