const responseUtil = require("../utils/response.util")
const {Admin, Staff} = require('../models')



module.exports = {
    verifyCreate: async (req, res, next) => {
        try {
            const roleAdmin = await Admin.findOne({where: {userId: req.data.userId}})
            const roleStaff = await Staff.findOne({where: {userId: req.data.userId}})
            if(!roleAdmin && !roleStaff){
                next()
            }else {
                return res.status(403).json({
                    status: 403,
                    data: [],
                    errors: "Admin and staff can't report !"
                })
            }
        } catch (error) {
            console.log(error)
            const {code, data} = responseUtil.serverError()
            res.status(code).json(data)
        }
    }
}