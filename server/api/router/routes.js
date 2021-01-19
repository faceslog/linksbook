const express = require("express");
const userController = require("../controllers/userController");
const linkController = require("../controllers/linkController");
const auth = require("../../utils/auth");

const router = express.Router();
// Link Controller
router.post("/addlink", auth, linkController.registerNewLink);
// User Controller
router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/users", userController.getUsers);
router.get("/dashboard", auth, userController.getUserDetails);
router.get("/:username", userController.getUserByUsername);

module.exports = router;