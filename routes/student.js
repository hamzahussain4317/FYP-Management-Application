const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController.js");

router.get("/getProfile/:stdID", studentController.getProfile);

// router.get("/getGroupDetails",studentController.getGroupDetails);

// router.get("/getSupervisors", studentController.getSupervisorList);

// router.get('/getProposal',studentController.getProposal);

module.exports = router;
