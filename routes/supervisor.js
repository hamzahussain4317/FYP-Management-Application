const express = require("express");
const router = express.Router();
const supervisorController = require("../controllers/supervisorController.js");

router.get("/getProfile/:supervisorID", supervisorController.getProfile);
router.post("/addSupervisor",supervisorController.addSupervisor);

router.get(
  "/getSupervisingGroups/:supervisorID",
  supervisorController.getSupervisingGroups
);

module.exports = router;
