const { Address } = require('../models')
const addressService = require('../services/address.service')
const responseUtil = require('../utils/response.util')


module.exports = {
  currentAddress: async (req, res) => {
    try {
      const { code, data } = await addressService.currentAddress(req.data.userId)
      res.status(code).json(data)
    } catch (error) {
      console.log(error)
      const { code, data } = responseUtil.serverError()
      res.status(code).json(data)
    }
  },
  create: async (req, res) => {
    try {
      const body = req.body
    } catch (error) {
      console.log(error)
    }
  },
  getAll: async (req, res) => {
    try {
      const addresses = await Address.findAll({where: {userId: req.data.userId}})
      return res.status(200).json({
        status: 200,
        data: addresses
      })
    } catch (error) {
      console.log(error)
    }
  },
  create: async (req, res) => {
    try {
      const body = req.body
      const userId = req.data.userId
      const newAddress = await Address.create({
        detail: body.detail,
        street: body.street,
        district: body.district,
        ward: body.ward,
        city: body.city,
        phone: body.phone,
        userId,
        isSelect: false
      })
      return res.status(200).json({
        status: 200,
        data: newAddress
      })
    } catch (error) {
      console.log(error)
    }
  }
}