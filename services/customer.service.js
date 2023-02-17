const {Customer, sequelize} = require('../models')
const responseUtil = require('../utils/response.util')
const {client} = require('../databases/redis.init')

module.exports = {
    register: async (userId) => {
        try {
            const newCustomer = await Customer.create({
                point: 0,
                userId: userId
            })
            return responseUtil.created(newCustomer)
        } catch (error) {
            return responseUtil.serverError()
        }
    },
    getAll: async () => {
        try {
            const cacheCustomer = await client.get("customers")
            if(cacheCustomer){
                console.log("cached")
                return responseUtil.getSuccess(JSON.parse(cacheCustomer))
            } else {
                const [customers] = await sequelize.query(`select u.* from users u, customers c where u.id = c.userId`)
                console.log("add to redis")
                await client.set("customers", JSON.stringify(customers))
                return responseUtil.getSuccess(customers)
            }
            
        } catch (error) {
            return responseUtil.serverError()
        }
    }
}