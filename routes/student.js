const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController.js");

router.post("/addStudent",studentController.addStudent);

router.get("/getProfile/:stdID", studentController.getProfile);

router.post("/createGroup", studentController.assignGroup);

router.get("/GroupDetails/:stdID", studentController.getGroupDetails);

router.get("/getSupervisors", studentController.getSupervisorList);

router.post('/createProposal',studentController.createProposal);

router.post('/assignTask/:stdID',studentController.assignTask);

router.get('/viewTsak',studentController.viewTask);

router.post('/updateTask',studentController.updateTask);

module.exports = router;
