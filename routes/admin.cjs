const express = require("express");
const { isAdmin } = require("../middlewares/authMiddleware.js");

const router = express.Router();

const adminControllers = require("../controllers/adminControllers.js");

router.post("/registerUser", isAdmin, adminControllers.registerUser);
router.get("/getAllGroups", adminControllers.getAllGroupsDetails);
router.get("/getGroupById/:groupID",adminControllers.getGroupById);
router.patch("/", isAdmin, adminControllers.patchGroupById);

module.exports = router;
