const {User, Address, Cart, Customer} = require('../models')
const {users, address, cart, customers} = require('../data/user.data')

module.exports = {
    importUser: async (req, res) => {
        try {
            const responseUsers = await User.bulkCreate(users)
            await Address.bulkCreate(address)
            await Cart.bulkCreate(cart)
            await Customer.bulkCreate(customers)
            res.status(201).json(users)
        } catch (error) {
            console.log(error)
        }
    }
}