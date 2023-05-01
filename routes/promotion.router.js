const promotionController = require('../controllers/promotion.controller')

const promotionRouter = require('express').Router()

promotionRouter.post('/', promotionController.create)
promotionRouter.post('/:promotionId/delete', promotionController.delete )
promotionRouter.post('/:promotionId/update', promotionController.update)
promotionRouter.get('/:shopId/get-all', promotionController.getAll)


module.exports = {promotionRouter}