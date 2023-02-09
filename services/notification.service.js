const {Notification} = require('../models')
const responseUtil = require('../utils/response.util')


module.exports = {
    create: async (body) => {
        try {
            const newNotification = await Notification.create({
                content: body.content,
                type: body.type,
                valueId: body.valueId,
                creatorId: body.creatorId,
                userId: body.userId
            })
            return responseUtil.created(newNotification)
        } catch (error) {
            console.log(error)
            return responseUtil.serverError()
        }
    }
}