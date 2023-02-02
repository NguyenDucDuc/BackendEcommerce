const { userRouter } = require('./user.router')

const indexRouter = require('express').Router()

indexRouter.use("/user", userRouter)

module.exports = {indexRouter}