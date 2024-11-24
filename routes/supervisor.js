const express = require("express");
const router = express.Router();
const supervisorController = require("../controllers/supervisorController.js");

router.get("/getProfile/:supervisorID", supervisorController.getProfile);


module.exports = router;
