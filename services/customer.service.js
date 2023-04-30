const {Customer, sequelize} = require('../models')
const responseUtil = require('../utils/response.util')
const {client} = require('../databases/redis.init')
const resUtil = require('../utils/res.util')

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
    },
    getDetail: async({userId}) => {
        try {
            const customer = await Customer.findOne({where: {
                userId: userId
            }})
            return resUtil.successful(200, customer)
        } catch (error) {
            return resUtil.serverError();
        }
    },
    checkBoughtProduct: async (userId, productId) => {
        try {
            const [result] = await sequelize.query(`
                select d.*
                from customers c, orders o, orderdetails d
                where c.id = o.customerId and o.id = d.orderId and c.userId=${userId} and d.productId=${productId} and o.status = 'Đợi xét duyệt'
            `)
            return responseUtil.getSuccess(result)
        } catch (error) {
            console.log(error)
            return responseUtil.serverError()
        }
    }
}