const addressService = require("../services/address.service");
const userService = require("../services/user.service");
const {validationResult} =require('express-validator');
const responseUtil = require("../utils/response.util");

module.exports = {
    registerUser: async (req, res) => {
        try {
            const body = req.body
            const errors = validationResult(req)
            if(errors.isEmpty()){
                const newUser = await userService.registerUser(body)
                // create address and reference to table User
                const newAddress = await addressService.create(newUser.id)
                const {code, data} = responseUtil.created(newUser)
                res.status(code).json(data)
            }else {
                
                const {code, data} = responseUtil.badRequest(errors.array())
                res.status(code).json(data)
            }
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError
            res.status(code).json(data)
        }
    },
    login: async (req, res) => {
        try {
            const body = req.body
            const {code, data} = await userService.login(body)
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json("Error")
        }
    },
    getAll: async (req, res) => {
        try {
            
            const {code, data} = await userService.getAll()
            res.status(code).json(data)
        } catch (error) {
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    }
}