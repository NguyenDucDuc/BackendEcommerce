const { Customer, User } = require('../models')
const customerService = require('../services/customer.service')
const responseUtil = require('../utils/response.util')
const nodemailer = require('nodemailer')


const mailerTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "nguyenducduc2441@gmail.com",
    pass: process.env.GMAIL_PASSWORD,
  },
});

module.exports = {
  getAll: async (req, res) => {
    try {
      const { code, data } = await customerService.getAll()
      res.status(code).json(data)
    } catch (error) {
      console.log(error)
      const { code, data } = responseUtil.serverError()
      res.status(code).json(data)
    }
  },
  getDetail: async (req, res) => {
    try {
      const { code, data } = await customerService.getDetail(req.params)
      res.status(code).json(data)
    } catch (error) {
      console.log(error)
      const { code, data } = responseUtil.serverError()
      res.status(code).json(data)
    }
  },
  checkBoughtProduct: async (req, res) => {
    try {
      const { code, data } = await customerService.checkBoughtProduct(req.body.userId, req.body.productId)
      res.status(code).json(data)
    } catch (error) {
      console.log(error)
      const { code, data } = responseUtil.serverError()
      res.status(code).json(data)
    }
  },
  lock: async (req, res) => {
    try {
      const params = req.params
      const user = await User.findByPk(params.userId)
      user.isActive = false
      await user.save()
      // // send mail
      // await mailerTransport.sendMail({
      //   to: user.email,
      //   subject: "TẠM KHÓA TÀI KHOẢN",
      //   html: `<h4>Tài khoản của bạn tạm thời bị khóa!!!</h4>`,
      // });
      return res.status(200).json({
        status: 200,
        data: user
      })
    } catch (error) {
      console.log(error)
    }
  },
  unlock: async (req, res) => {
    try {
      const params = req.params
      const user = await User.findByPk(params.userId)
      user.isActive = true
      await user.save()
      // // send mail
      // await mailerTransport.sendMail({
      //   to: user.email,
      //   subject: "MỞ KHÓA TÀI KHOẢN",
      //   html: `<h4>Tài khoản của bạn đã được mở khóa!!!</h4>`,
      // });
      return res.status(200).json({
        status: 200,
        data: user
      })
    } catch (error) {
      console.log(error)
    }
  }
  
}