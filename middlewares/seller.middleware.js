const {Seller, Admin, Staff} = require('../models')
const responseUtil = require('../utils/response.util')



module.exports = {
    verifyRegister: async (req, res, next) => {
        try {
            const userId = req.data.userId
            const roleAdmin = await Admin.findOne({where: {userId: userId}})
            const roleStaff = await Staff.findOne({where: {userId: userId}})
            if(!roleStaff && !roleAdmin){
                next()
            }else {
                return res.status(400).json({
                    status: 400,
                    data: [],
                    errors: "Admin and staff can't register !"
                })
            }
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    }
}