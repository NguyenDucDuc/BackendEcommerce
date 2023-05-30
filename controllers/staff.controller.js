const {Staff} = require('../models')
const staffService = require('../services/staff.service')
const responseUtil = require('../utils/response.util')


module.exports = {
    confirmSeller: async (req, res) => {
        try {
            const sellerId = parseInt(req.params.sellerId)
            const {code, data} = await staffService.confirmSeller(sellerId)
            res.status(code).json(data)
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    },
    grantStaff: async (req, res) => {
        try {
            const staff = await Staff.findOne({where: {userId: +req.params.userId}})
            if(staff !== null){
                return res.status(200).json({
                    status: 200,
                    data: true
                })
            } else {
                const newStaff = await Staff.create({
                    joinDate: new Date(),
                    userId: +req.params.userId
                })
                return res.status(200).json({
                    status: 200,
                    data: true
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}