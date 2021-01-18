const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const auth = require("../../../utils/auth");

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/dashboard", auth, userController.getUserDetails);

module.exports = router;