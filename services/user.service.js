const {User, Address, sequelize} = require('../models')
const bcrypt = require('bcrypt')
const { DATE } = require('sequelize')
const jwt = require('jsonwebtoken')
const responseUtil = require('../utils/response.util')

module.exports = {
    registerUser: async (body) => {
        try {
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
            return responseUtil.serverError
        }
    }
}