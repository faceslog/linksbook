const express = require("express");
const userController = require("../controllers/userController");
const linkController = require("../controllers/linkController");
const auth = require("../../utils/auth");

const router = express.Router();

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/users", userController.getUsers);
router.get("/:username", userController.getUserByUsername);
router.get("/dashboard", auth, userController.getUserDetails);

module.exports = router;