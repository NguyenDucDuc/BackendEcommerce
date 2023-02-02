const userController = require('../controllers/user.controller')

const userRouter = require('express').Router()

userRouter.post("/register", userController.registerUser)
userRouter.post("/login", userController.login)

module.exports = {userRouter}