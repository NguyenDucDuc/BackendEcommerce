const attributeGroupController = require("../controllers/attribute-group.controller");

const router = require("express").Router();

router.get("", attributeGroupController.getAllAtrributeGroup);

module.exports = router;
