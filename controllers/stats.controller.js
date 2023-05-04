const { Shop, Seller, Product, Order, Customer, sequelize } = require('../models')
const { Message } = require('../schemas/message.schema')

module.exports = {
    statsShop: async (req, res) => {
        try {
            const countShop = await Shop.count()
            const countProduct = await Product.count()
            const countCustomer = await Customer.count()
            return res.status(200).json({
                status: 200,
                data: { countShop, countProduct, countCustomer }
            })
        } catch (error) {
            console.log(error)
        }
    },
    countShopByMonth: async (req, res) => {
        try {
            const [data] = await sequelize.query(`select month(createdAt) as 'month', count(id) as 'countShop'
            from shops
            group by month(createdAt)`)
            let newData = []
            for (let i = 1; i <= 12; i++) {
                const value = {
                    month: `Tháng ${i}`,
                    countShop: data.find((item) => item.month === i)?.countShop || 0
                }
                newData.push(value)
            }
            return res.status(200).json({
                status: 200,
                data: newData
            })
        } catch (error) {
            console.log(error)
        }
    },
    countUserByMonth: async (req, res) => {
        try {
            const [data] = await sequelize.query(`
            select month(createdAt) as 'month', count(*) as 'countCustomer'
            from customers
            group by month(createdAt)
            `)
            let newData = []
            for (let i = 1; i <= 12; i++) {
                const value = {
                    month: `Tháng ${i}`,
                    countCustomer: data.find((item) => item.month === i)?.countCustomer || 0
                }
                newData.push(value)
            }
            return res.status(200).json({
                status: 200,
                data: newData
            })
        } catch (error) {
            console.log(error)
        }
    }
}