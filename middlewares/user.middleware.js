const User = require('../models')
const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken: async (req, res, next) => {
        try {
            const token = req.headers.authorization
            if(token) {
                const accessToken = token.split(" ")[1]
                const decode = await jwt.decode(accessToken, "duc-nd")
                req.data = decode
                next()
            }else {
                return {
                    code: 400,
                    data: "Token is not valid !"
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