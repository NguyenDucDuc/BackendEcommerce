const userController = require('../controllers/user.controller')
const {check} = require('express-validator')
const userMiddleware = require('../middlewares/user.middleware')
const userRouter = require('express').Router()

// register user
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
// normal login
userRouter.post("/login",  
[
    check('userName').notEmpty().withMessage("username is required !"),
    check('passWord').notEmpty().withMessage("password is required !")
]
,userController.login)
// get all user
userRouter.get("/", userController.getAll)
// update user
userRouter.patch("/:userId", userMiddleware.verifyToken, userMiddleware.verifyUpdate, userController.update)
// get user detail
userRouter.get("/:userId", userController.getDetail)
// forget password
userRouter.post("/reset-password", 
[
    check('userName').notEmpty().withMessage("username is required !")
]
,userController.resetPassword)
// google login
userRouter.post("/google-login", userController.googleLogin)
// facebook login
userRouter.post("/facebook-login", userController.facebookLogin)


module.exports = {userRouter}