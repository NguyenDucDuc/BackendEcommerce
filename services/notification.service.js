const { client } = require('../databases/redis.init');
const { Notification } = require('../models');
const responseUtil = require('../utils/response.util');

module.exports = {
  create: async (body) => {
    try {
      const newNotification = await Notification.create({
        content: body.content,
        type: body.type,
        valueId: body.valueId,
        creatorId: body.creatorId,
        userId: body.userId,
      });
      return responseUtil.created(newNotification);
    } catch (error) {
      console.log(error);
      return responseUtil.serverError();
    }
  },
  getByUserId: async (userId) => {
    try {
      // const cacheNotification = await client.get(`notification-${userId}`)
      // if(cacheNotification) {
      //     console.log("cache notification")
      //     return responseUtil.getSuccess(JSON.parse(cacheNotification))
      // }
      const notifications = await Notification.findAll(
        { where: { userId: userId }, order: [['id', 'DESC']] },
        
      );
      // await client.set(`notification-${userId}`, JSON.stringify(notifications))
      return responseUtil.getSuccess(notifications);
    } catch (error) {
      console.log(error);
      return responseUtil.serverError();
    }
  },
};
