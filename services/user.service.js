const {User, Address, sequelize, Shop, Customer, Seller} = require('../models')
const bcrypt = require('bcrypt')
const { DATE } = require('sequelize')
const jwt = require('jsonwebtoken')
const responseUtil = require('../utils/response.util')
const nodemailer = require('nodemailer')
const OTP = require('otp-generator')
const { client } = require('../databases/redis.init')
const customerService = require('./customer.service')
const cartService = require('./cart.service')
const cloudinary = require('cloudinary').v2
require('dotenv').config()


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


module.exports = {
    uploadAvatar: async (files) => {
        try {
            console.log("AAA")
            const avatar = files.avatar
                const result = await cloudinary.uploader.upload(avatar.tempFilePath, {
                    public_id: `${Date.now()}`,
                    resource_type: "auto",
                    folder: "Avatar"
                })
                return {
                    URL: result.url
                }
        } catch (error) {
            console.log(error)
        }
    },
    registerUser: async (body, files) => {
        try {
            console.log("ADAD")
            const oldUser = await User.findOne({where: {userName: body.userName}})
            if(!oldUser) {
                //upload image to cloudinary
                const avatar = files.avatar
                const result = await cloudinary.uploader.upload(avatar.tempFilePath, {
                    public_id: `${Date.now()}`,
                    resource_type: "auto",
                    folder: "Avatar"
                })
                //
                const salt = await bcrypt.genSalt(10)
                const hashed = await bcrypt.hash(body.passWord, salt)
                const newUser = await User.create({
                    userName: body.userName,
                    passWord: hashed,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    phone: body.phone,
                    avatar: result.url,
                    email: body.email,
                    birthDay: body.birthDay,
                    status: true,
                    lastVisited: Date.now(),
                    isActive: true,
                })
                return responseUtil.created(newUser)
            }else {
                return {
                    code: 400,
                    data: {
                        status: 400,
                        data: [],
                        errors: "Username already exists"
                    }
                }
            }
            
        } catch (error) {
            console.log(error)
            return responseUtil.serverError()
        }
    },
    login: async (body) => {
        try {
            const user = await User.findOne({where: {userName: body.userName}})
            if(user){
                const validPassword = await bcrypt.compare(body.passWord, user.passWord)
                if(validPassword){
                    const accessToken = await jwt.sign({
                        userId: user.id
                    }, "duc-nd")
                    console.log(accessToken)
                    //combine object
                    const infoUser = {
                        user: user,
                        accessToken: accessToken
                    }
                    return responseUtil.getSuccess(infoUser)
                }else {
                    return {
                        code: 400,
                        data: {
                            status: 400,
                            data: [],
                            errors: "Username or password not valid !"
                        }
                        
                    }
                }
            }else {
                return {
                    code: 400,
                    data: {
                        status: 400,
                        data: "Username or password not valid!"
                    }
                    
                }
            }
        } catch (error) {
            console.log(error)
            return responseUtil.serverError()
        }
    },
    googleLogin: async (body) => {
        try {
            const userName = body.email.split("@")[0]
            const user = await User.findOne({where: {userName: userName}})
            if(user){
                return responseUtil.getSuccess(user)
            }else {
                // create new user
                const newUser = await User.create({
                    userName: userName,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    avatar: body.avatar,
                    email: body.email,
                    isActive: true,
                    birthDay: Date.now(),
                    lastVisited: Date.now(),
                    status: true
                })
                // add to customer role
                await customerService.register(newUser.id)
                // create cart
                await cartService.create(newUser.id)
                return responseUtil.created(newUser)
            }
        } catch (error) {
            return responseUtil.serverError()
        }
    },
    facebookLogin: async (body) => {
        try {
            const userId = body.userId
            const user = await User.findByPk(userId)
            if(user){
                return responseUtil.getSuccess(user)
            } else {
                const newUser = await User.create({
                    id: userId,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    avatar: body.avatar,
                    email: body.email,
                    isActive: true,
                    birthDay: Date.now(),
                    lastVisited: Date.now(),
                    status: true
                })
                // add to customer role
                await customerService.register(newUser.id)
                // create cart
                await cartService.create(newUser.id)
                return responseUtil.created(newUser)
            }
        } catch (error) {
            console.log(error)
            return responseUtil.serverError
        }
    },
    getAll: async (query) => {
        try {
            const cacheUser = await client.get("users")
            let queryString = `select * from users `
            if(cacheUser && query.name === undefined){
                console.log("cache list user")
                return responseUtil.getSuccess(JSON.parse(cacheUser))
            }
            if(!cacheUser && query.name === undefined){
                const [users] = await sequelize.query(queryString)
                await client.set("users", JSON.stringify(users))
                return responseUtil.getSuccess(users)
            }
            if(query.name){
                const name = query.name
                queryString += `where firstName like '%${name}%' or lastName like '%${name}%'`
            }
            const [users] = await sequelize.query(queryString)
            return responseUtil.getSuccess(users)
        } catch (error) {
            return responseUtil.serverError()
        }
    },
    update: async (body, userId) => {
        try {
            const user = await User.findByPk(userId)
            const address = await Address.findOne({where: {userId: userId}})
            if(user){
                if(body.firstName){
                    user.firstName = body.firstName
                }
                if(body.lastName){
                    user.lastName = body.lastName
                }
                if(body.phone){
                    user.phone = body.phone
                }
                if(body.email){
                    user.email = body.email
                }
                if(body.city){
                    address.city = body.city
                }
                if(body.district){
                    address.district = body.district
                }
                if(body.ward){
                    address.ward = body.ward
                }
                if(body.street){
                    address.street = body.street
                }
                if(body.detail){
                    address.detail = body.detail
                }
                await address.save()
                await user.save()
            }
            return responseUtil.getSuccess(user)
        } catch (error) {
            return responseUtil.serverError()
        }
    },
    getDetail: async (userId) => {
        try {
            const user = await User.findByPk(userId)
            const address = await Address.findOne({where: {userId: userId}})
            // combine object
            const userDetail = {
                user,
                address
            }
            return responseUtil.getSuccess(userDetail)
        } catch (error) {
            console.log(error)
            return responseUtil.serverError()
        }
    },
    resetPassword: async (userName) => {
        const user = await User.findOne({where: {userName: userName}})
        if(user){
            const mailerTransport = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                    user: "nguyenducduc2441@gmail.com",
                    pass: process.env.GMAIL_PASSWORD
                }
            })
            const salt = await bcrypt.genSalt(10)
            const newPassword = await OTP.generate(6, {specialChars: false})
            const hashed = await bcrypt.hash(newPassword, salt)
            await mailerTransport.sendMail({
                to: user.email,
                subject: "Reset your password",
                html: `<h4>Your new password is: ${newPassword}</h4>`
            })
            user.passWord = hashed
            await user.save()
            return {
                code: 200,
                data: {
                    status: 200,
                    data: [],
                    message: "Password has been refreshed"
                }
            }
        }else {
            return {
                code: 400,
                data: {
                    status: 400,
                    data: [],
                    errors: "Username is doesn't exists"
                }
            }
        }
    },
    statsAll: async () => {
        try {
            const sellers = await Seller.findAll()
            const customers = await Customer.findAll()
            return {
                code: 200,
                data: {
                    status: 200,
                    data: {
                        customer: customers.length,
                        counterparty: sellers.length
                    }
                }
            }
        } catch (error) {
            console.log(error)
            return responseUtil.serverError()
        }
    }
}

