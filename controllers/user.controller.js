const addressService = require("../services/address.service");
const userService = require("../services/user.service");
const {validationResult} =require('express-validator');
const responseUtil = require("../utils/response.util");
const customerService = require("../services/customer.service");
const cartService = require("../services/cart.service");

module.exports = {
    registerUser: async (req, res) => {
        try {
            const body = req.body
            const errors = validationResult(req)
            if(errors.isEmpty()){
                const {code, data} = await userService.registerUser(body)
                // create address and reference to table User
                const newAddress = await addressService.create(body, data.data.id)
                // create role customer
                await customerService.register(body, data.data.id)
                // create cart
                await cartService.create(data.data.id)
                res.status(code).json(data)
            }else {
                const {code, data} = responseUtil.errorsValidate(errors.array())
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
            const query = req.query
            const {code, data} = await userService.getAll(query)
            res.status(code).json(data)
        } catch (error) {
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    },
    update: async (req, res) => {
        try {
            const body = req.body
            const userId = req.params.userId
            const {code, data} = await userService.update(body, userId)
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    },
    getDetail: async (req, res) => {
        try {
            const userId = req.params.userId
            const {code, data} = await userService.getDetail(userId)
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    }
}