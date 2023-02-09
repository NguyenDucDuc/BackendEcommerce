const userController = require('../controllers/user.controller')
const {check} = require('express-validator')
const userMiddleware = require('../middlewares/user.middleware')
const userRouter = require('express').Router()

userRouter.post("/", 
[
    check('userName').notEmpty().withMessage("username is required !"),
    check('firstName').notEmpty().withMessage("first name is required !"),
    check('lastName').notEmpty().withMessage("last name is required !"),
    check('city').notEmpty().withMessage("city is required !"),
    check('district').notEmpty().withMessage("district is required !"),
    check('ward').notEmpty().withMessage("ward is required !"),
    check('street').notEmpty().withMessage("street is required !")
]
, userController.registerUser)
userRouter.post("/login",  
[
    check('userName').notEmpty().withMessage("username is required !"),
    check('passWord').notEmpty().withMessage("password is required !")
]
,userController.login)
userRouter.get("/", userController.getAll)
userRouter.patch("/:userId", userMiddleware.verifyToken, userMiddleware.verifyUpdate, userController.update)
userRouter.get("/:userId", userController.getDetail)
userRouter.post("/reset-password", 
[
    check('userName').notEmpty().withMessage("username is required !")
]
,userController.resetPassword)

module.exports = {userRouter}