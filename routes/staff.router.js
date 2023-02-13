const staffController = require('../controllers/staff.controller')
const userMiddleware = require('../middlewares/user.middleware')

const staffRouter = require('express').Router()

staffRouter.post("/confirm/:sellerId", userMiddleware.verifyToken, userMiddleware.verifyStaff ,staffController.confirmSeller)

module.exports = {staffRouter}