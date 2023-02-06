const {User, Address, sequelize} = require('../models')
const bcrypt = require('bcrypt')
const { DATE } = require('sequelize')
const jwt = require('jsonwebtoken')
const responseUtil = require('../utils/response.util')
const nodemailer = require('nodemailer')
const OTP = require('otp-generator')
require('dotenv').config()

module.exports = {
    registerUser: async (body) => {
        try {
            const oldUser = await User.findOne({where: {userName: body.userName}})
            if(!oldUser) {
                const salt = await bcrypt.genSalt(10)
                const hashed = await bcrypt.hash(body.passWord, salt)
                const newUser = await User.create({
                    userName: body.userName,
                    passWord: hashed,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    phone: body.phone,
                    avatar: body.avatar,
                    email: body.email,
                    birthDay: Date.now(),
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
    getAll: async (query) => {
        try {
            let queryString = `select * from users `
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
    }
}

