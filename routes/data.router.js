const dataController = require('../controllers/data.controller')

const dataRouter = require('express').Router()

dataRouter.post("/import-users", dataController.importUser)


module.exports = {dataRouter}