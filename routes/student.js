const express = require("express");
const router = express.Router();
const studentController = require("../controllers/authController.js");

router.post("/getSupervisors", studentController.getSupervisorList);

router.get("/getProfile/:stdID", studentController.getProfile);

router.get('/getProposal',studentController.getProposal)

module.exports = router;
