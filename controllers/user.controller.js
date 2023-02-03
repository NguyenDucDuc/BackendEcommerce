const addressService = require("../services/address.service");
const userService = require("../services/user.service");

module.exports = {
    registerUser: async (req, res) => {
        try {
            const body = req.body
            const {code, data} = await userService.registerUser(body)
            // create address and reference to table User
            const newAddress = await addressService.create(body,data.data.id)
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
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
    }
}