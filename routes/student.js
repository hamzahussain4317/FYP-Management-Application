const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController.js");

router.get("/getProfile/:stdID", studentController.getProfile);

router.post("/createGroup", studentController.assignGroup);

router.get("/GroupDetails/:stdID", studentController.getGroupDetails);

router.get("/getSupervisors", studentController.getSupervisorList);

// router.get('/getProposal',studentController.getProposal);

module.exports = router;
