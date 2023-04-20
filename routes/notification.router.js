const notificationController = require("../controllers/notification.controller");
const userMiddleware = require("../middlewares/user.middleware");
const notificationRouter = require("express").Router();

// notificationRouter.post("/", notificationController.create);
notificationRouter.post(
  "/",
  userMiddleware.verifyToken,
  notificationController.create
);
notificationRouter.get(
  "/",
  userMiddleware.verifyToken,
  notificationController.getByUserId
);

module.exports = { notificationRouter };
