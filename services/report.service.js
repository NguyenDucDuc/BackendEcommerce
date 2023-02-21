const {Report, sequelize} = require('../models')
const { getSuccess } = require('../utils/response.util')
const responseUtils = require('../utils/response.util')

module.exports = {
    create: async (customerId, shopId) => {
        try {
            const newReport = await Report.create({
                customerId: customerId,
                shopId: shopId
            })
            return responseUtils.created(newReport)
        } catch (error) {
            return responseUtils.serverError()
        }
    },
    getAll: async () => {
        try {
            const [reports] = await sequelize.query(`
                select r.shopId, s.shopName, count(r.id) as 'SoLuong'
                from reports r, shops s
                where r.shopId = s.id
                group by r.shopId
            `)
            return getSuccess(reports)
        } catch (error) {
            console.log(error)
            return responseUtils.serverError()
        }
    }
}