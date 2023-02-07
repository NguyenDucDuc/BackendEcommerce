const User = require('../models')
const jwt = require('jsonwebtoken')
const responseUtil = require('../utils/response.util')

module.exports = {
    verifyToken: async (req, res, next) => {
        try {
            const token = req.headers.authorization
            if(token !== undefined) {
                const accessToken = token.split(" ")[1]
                const decode = await jwt.decode(accessToken, "duc-nd")
                req.data = decode
                next()
            }else {
                res.status(400).json({
                    status: 400,
                    data: [],
                    errors: "Token is not valid !"
                })
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