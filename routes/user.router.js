const userController = require('../controllers/user.controller')
const {check} = require('express-validator')
const userRouter = require('express').Router()

userRouter.post("/register", [check("userName").notEmpty().withMessage("user name is required")], userController.registerUser)
userRouter.post("/login", userController.login)
userRouter.get("/get-all", userController.getAll)

module.exports = {userRouter}