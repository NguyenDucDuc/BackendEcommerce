const { Seller, User, sequelize, Customer } = require('../models')
const responseUtil = require('../utils/response.util')
const { client } = require('../databases/redis.init')
const { Conversation } = require('../schemas/conversation.schema')
const nodemailer = require('nodemailer')



module.exports = {
  register: async (userId) => {
    try {
      const seller = await Seller.findOne({ where: { userId: userId } })
      if (!seller) {
        const newSeller = await Seller.create({
          isConfirm: false,
          userId: userId
        })
        const user = await User.findByPk(userId)
        // add new  seller to redis
        // await client.json.arrAppend("sellers","$",user)
        // console.log("add new seller to redis")

        // tạo cuộc trò truyện với customer
        const listCustomer = await Customer.findAll()
        await Promise.all(listCustomer.map(async (customer) => {
          if (customer.userId !== userId) {
            await Conversation.create({
              members: [userId, customer.userId]
            })
          }
        }))
        return responseUtil.created(newSeller)
      } else {
        return {
          code: 400,
          data: {
            status: 400,
            data: [],
            errors: "Bạn đã là đối tác của chúng tôi."
          }
        }
      }
    } catch (error) {
      return responseUtil.serverError()
    }
  },
  getAll: async () => {
    try {
      // const cacheSeller = await client.json.get('sellers', '$')
      // if(cacheSeller){
      //     console.log("cached seller")
      //     return responseUtil.getSuccess(cacheSeller)
      // }else {
      //     const [sellers] = await sequelize.query(`
      //     select u.*
      //     from users u, sellers s
      //     where u.id = s.userId
      //     `)
      //     console.log("add to redis")
      //     await client.json.set("sellers","$", sellers)
      //     return responseUtil.getSuccess(sellers)
      // }
      const [sellers] = await sequelize.query(`
                select u.*
                from users u, sellers s
                where u.id = s.userId
                `)
      console.log("add to redis")
      await client.json.set("sellers", "$", sellers)
      return responseUtil.getSuccess(sellers)
    } catch (error) {
      console.log("asd")
      return responseUtil.serverError()
    }
  },
  lock: async (userId) => {
    try {
      const [[user]] = await sequelize.query(`
                select u.*
                from users u, sellers s
                where u.id = s.userId and u.id = ${userId}
            `)
      if (user) {
        await sequelize.query(`
                    update users
                    set isActive = ${false}
                    where id = ${userId}
                `)
        const newUser = await User.findOne({ where: { id: userId } })
        // send mail
        const mailerTransport = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          auth: {
            user: "nguyenducduc2441@gmail.com",
            pass: process.env.GMAIL_PASSWORD,
          },
        });
        await mailerTransport.sendMail({
          to: newUser.email,
          subject: "TẠM KHÓA TÀI KHOẢN",
          html: `<h4>Tài khoản của bạn tạm thời bị khóa để chúng tôi xem xét!!!</h4>`,
        });
        return responseUtil.updateSuccess(newUser)
      } else {
        return {
          code: 400,
          data: {
            status: 400,
            data: [],
            errors: "user doesn't not exists"
          }
        }
      }

    } catch (error) {
      console.log(error)
      return responseUtil.serverError()
    }
  },
  unLock: async (userId) => {
    try {
      const [[user]] = await sequelize.query(`
                select u.*
                from users u, sellers s
                where u.id = s.userId and u.id = ${userId}
            `)
      if (user) {
        await sequelize.query(`
                    update users
                    set isActive = ${true}
                    where id = ${userId}
                `)
        const newUser = await User.findOne({ where: { id: userId } })
        // send mail
        const mailerTransport = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          auth: {
            user: "nguyenducduc2441@gmail.com",
            pass: process.env.GMAIL_PASSWORD,
          },
        });
        await mailerTransport.sendMail({
          to: newUser.email,
          subject: "MỞ KHÓA TÀI KHOẢN",
          html: `<h4>Tài khoản của bạn đã được mở khóa!!!</h4>`,
        });
        return responseUtil.updateSuccess(newUser)
      } else {
        return {
          code: 400,
          data: {
            status: 400,
            data: [],
            errors: "user doesn't not exists"
          }
        }
      }

    } catch (error) {
      console.log(error)
      return responseUtil.serverError()
    }
  }
}