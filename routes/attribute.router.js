const attributeController = require("../controllers/attribute.controller");

const router = require("express").Router();

router.get("/:groupId", attributeController.getAtrributeByGroupID);

module.exports = router;
