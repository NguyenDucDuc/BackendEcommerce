const User = require('../models')
const jwt = require('jsonwebtoken')
const responseUtil = require('../utils/response.util')

module.exports = {
    verifyToken: async (req, res, next) => {
        try {
            let token = "token"
            token = req.headers.authorization
            if(token !== "token") {
                const accessToken = token.split(" ")[1]
                const decode = await jwt.decode(accessToken, "duc-nd")
                req.data = decode
                next()
            }else {
                return {
                    code: 400,
                    data: {
                        status: 400,
                        errors: "Token is not valid !"
                    }
                }
            }
        } catch (error) {
            console.log(error)
            return responseUtil.serverError()
        }
    },
    verifyUpdate: async (req, res, next) => {
        try {
            
            if(parseInt(req.data.userId) === parseInt(req.params.userId)){
                next()
            }else {
                return {
                    code: 403,
                    data: {
                        status: 403,
                        data: [],
                        errors: "Forbbiden"
                    }
                }
            }
        } catch (error) {
            console.log(error)
            return responseUtil.serverError()
        }
    }
}