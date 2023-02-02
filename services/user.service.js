const {User, Address} = require('../models')
const bcrypt = require('bcrypt')
const { DATE } = require('sequelize')
const jwt = require('jsonwebtoken')

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
            return {
                code: 200,
                data: newUser
            }
        } catch (error) {
            console.log(error)
            return {
                code: 500,
                data: "Error"
            }
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
                    return {
                        code: 200,
                        data: {
                            user: user,
                            accessToken: accessToken
                        }
                    }
                }else {
                    return {
                        code: 400,
                        data: "Username or password not valid!"
                    }
                }
            }else {
                return {
                    code: 400,
                    data: "Username or password not valid!"
                }
            }
        } catch (error) {
            console.log(error)
            return {
                code: 500,
                data: "Error"
            }
        }
    }
}