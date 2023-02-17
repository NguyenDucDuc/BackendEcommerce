const {Seller, User, sequelize} = require('../models')
const responseUtil = require('../utils/response.util')
const {client} = require('../databases/redis.init')

module.exports = {
    register: async (userId) => {
        try {
            const newSeller = await Seller.create({
                isConfirm: false,
                userId: userId
            })
            return responseUtil.created(newSeller)
        } catch (error) {
            return responseUtil.serverError()
        }
    },
    getAll: async () => {
        try {
            const sellerCache = await client.get("sellers")
            if(sellerCache){
                console.log("cached")
                return responseUtil.getSuccess(JSON.parse(sellerCache))
            }else {
                const [sellers] = await sequelize.query(`select u.* from users u, sellers s where u.id = s.userId`)
                // add to redis
                console.log("add to redis")
                await client.set("sellers", JSON.stringify(sellers))
                return responseUtil.getSuccess(sellers)
            }
        } catch (error) {
            console.log("asd")
            return responseUtil.serverError()
        }
    }
}