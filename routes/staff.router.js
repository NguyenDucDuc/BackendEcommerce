const staffController = require('../controllers/staff.controller')
const userMiddleware = require('../middlewares/user.middleware')

const staffRouter = require('express').Router()

staffRouter.post("/confirm/:sellerId", userMiddleware.verifyToken, userMiddleware.verifyStaff ,staffController.confirmSeller)
staffRouter.post("/grant/:userId", staffController.grantStaff)
staffRouter.post("/remove-role/:userId", userMiddleware.verifyToken, userMiddleware.verifyAdmin, staffController.removeRole)

module.exports = {staffRouter}