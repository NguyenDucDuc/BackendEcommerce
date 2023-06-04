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
  },
  setDefault: async (req, res) => {
    try {
      const addressDefault = await Address.findOne({where: {isSelect: true, userId: req.data.userId}})
      if(!addressDefault !== null){
        addressDefault.isSelect = false
        await addressDefault.save()
      }
      const newAddressDefault = await Address.findOne({where: {id: +req.params.id}})
      if(newAddressDefault !== null){
        newAddressDefault.isSelect = true
        await newAddressDefault.save()
      }
      return res.status(200).json({
        status: 200,
        data: true
      })
    } catch (error) {
      console.log(error)
    }
  },
  delete: async (req, res) => {
    try {
      const address = await Address.findOne({where: {id: +req.params.id}})
      await address.destroy()
      return res.status(200).json({
        status: 200,
        data: true
      })
    } catch (error) {
      console.log(error)
    }
  }
}