const express = require("express");
const { isAdmin } = require("../middlewares/authMiddleware.js");

const router = express.Router();

const adminControllers = require("../controllers/adminControllers.js");

router.post("/register", isAdmin, adminControllers.registerUser);
router.get("/getAllGroups", adminControllers.getAllGroupsDetails);
router.get("/getAllStudents", adminControllers.getAllGroupsDetails);
router.get("/getAllSupervisors", adminControllers.getAllGroupsDetails);
router.patch("/updateGroup/:groupID", isAdmin, adminControllers.patchGroupById);
router.get("/getGroupById/:groupID", adminControllers.getGroupById);

module.exports = router;
