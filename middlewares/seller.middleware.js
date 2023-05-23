const {Seller, Admin, Staff, sequelize} = require('../models')
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
    },
    verifyAdminOrStaff: async (req, res, next) => {
        try {
            const userId = req.data.userId
            const [staff] = await sequelize.query(`
                SELECT u.*
                FROM users u, staffs s
                WHERE u.id = s.userId and u.id=${userId}
            `)
            const [admin] = await sequelize.query(`
                SELECT u.*
                FROM users u, admins a 
                WHERE u.id = a.userId and u.id=${userId}
            `)
            if(staff.length !== 0 || admin.length !== 0){
                next()
            }else {
                return res.status(403).json({
                    status: 403,
                    data: [],
                    errors: "Bạn không có quyền truy cập!"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}