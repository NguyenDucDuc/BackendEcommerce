const statsController = require('../controllers/stats.controller')

const statsRouter = require('express').Router()


statsRouter.get("/stats-shop", statsController.statsShop)
statsRouter.get('/count-shop-by-month', statsController.countShopByMonth)
statsRouter.get('/count-user-by-month', statsController.countUserByMonth)


module.exports = {statsRouter}