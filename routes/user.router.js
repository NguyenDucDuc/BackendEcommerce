const userController = require('../controllers/user.controller');
const { check } = require('express-validator');
const userMiddleware = require('../middlewares/user.middleware');
const { verify } = require('jsonwebtoken');
const userRouter = require('express').Router();

// register user
userRouter.post(
  '/',
  [
    check('userName').notEmpty().withMessage('username is required !'),
    check('firstName').notEmpty().withMessage('first name is required !'),
    check('lastName').notEmpty().withMessage('last name is required !'),
    check('city').notEmpty().withMessage('city is required !'),
    check('district').notEmpty().withMessage('district is required !'),
    check('ward').notEmpty().withMessage('ward is required !'),
    check('street').notEmpty().withMessage('street is required !'),
  ],
  userController.registerUser
);
// normal login
userRouter.post(
  '/login',
  [
    check('userName').notEmpty().withMessage('username is required !'),
    check('passWord').notEmpty().withMessage('password is required !'),
  ],
  userController.login
);
// get all user
userRouter.get('/', userController.getAll);
// update user
userRouter.patch(
  '/:userId',
  userMiddleware.verifyToken,
  userMiddleware.verifyUpdate,
  userController.update
);
// get user detail
userRouter.get('/detail/:userId', userController.getDetail);
// forget password
userRouter.post(
  '/reset-password',
  [check('userName').notEmpty().withMessage('username is required !')],
  userController.resetPassword
);
// google login
userRouter.post('/google-login', userController.googleLogin);
// facebook login
userRouter.post('/facebook-login', userController.facebookLogin);
//
userRouter.get('/stats-all', userController.statsAll);

userRouter.post('/upload', userController.uploadAvatar);

//current user
userRouter.get("/current-user", userMiddleware.verifyToken, userController.currentUser)
// check role admin
userRouter.get("/role-admin", userMiddleware.verifyToken ,userController.roleAdmin)

module.exports = { userRouter };



