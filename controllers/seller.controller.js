const {Seller, sequelize} = require('../models')
const sellerService = require('../services/seller.service')
const responseUtil = require('../utils/response.util')


module.exports = {
    register: async (req, res) => {
        try {
            const {code, data} = await sellerService.register(req.data.userId)
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    },
    getAll: async (req, res) => {
        try {
            const {code, data} = await sellerService.getAll()
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    },
    lock: async (req, res) => {
        try {
            const {code,data} = await sellerService.lock(parseInt(req.params.userId))
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    },
    unLock: async (req, res) => {
        try {
            const {code,data} = await sellerService.unLock(parseInt(req.params.userId))
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    },
    getSellerUnofficial: async (req, res) => {
        try {
            const [listSeller] = await sequelize.query(`
                select u.*
                from users u, sellers s
                where u.id = s.userId and s.isConfirm = 0
            `)
            return res.status(200).json({
                status: 200,
                data: listSeller
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 500,
                data: [],
                error: 'Server Errors'
            })
        }
    },
    checkSellerOfficial: async (req, res) => {
        try {
            const userId = req.data.userId
            const sellerOfficial = await Seller.findOne({
                where: {
                    userId,
                    isConfirm: true
                }
            })
            if(sellerOfficial){
                return res.status(200).json({
                    status: 200,
                    data: sellerOfficial
                })
            }
            return res.status(200).json({
                status: 200,
                data: []
            })            
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                status: 400,
                data: [],
                error: 'Not found user'
            })
        }
    },
    confirmSeller: async (req, res) => {
        try {
            const userId = req.params.userId
            const seller = await Seller.findOne({where: {userId}})
            if(seller){
                seller.isConfirm = true
                await seller.save()
                return res.status(200).json({
                    status: 200,
                    data: seller
                })
            }
            return res.status(400).json({
                status: 400,
                data: [],
                error: 'User not found!'
            })
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                status: 500,
                data: [],
                error: 'Server error'
            })
        }
    },
    grant: async (req, res) => {
        try {
          const seller = await Seller.findOne({where: {userId: +req.params.userId}})
          if(seller){
            return res.status(200).json({
              status: 200,
              data: true
            })
          } else {
            const newSeller = await Seller.create({
              point: 10,
              userId: +req.params.userId,
              isConfirm: true
            })
            return res.status(200).json({
              status: 200,
              data: true
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
}