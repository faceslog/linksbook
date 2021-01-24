const express = require("express");
const userController = require("../controllers/userController");
const linkController = require("../controllers/linkController");
const { CONFIG } = require("../../utils/config");
const auth = require("../../utils/auth");

const router = express.Router();
// Link Controller
router.post('/' + CONFIG.routes.addlink, auth, linkController.registerNewLink);
router.post('/' + CONFIG.routes.deletelink, auth, linkController.deleteLink);
// User Controller
router.post('/' + CONFIG.routes.register, userController.registerNewUser);
router.post('/' + CONFIG.routes.login, userController.loginUser);
router.get('/' + CONFIG.routes.users, userController.getUsers);
router.get('/' + CONFIG.routes.dashboard, auth, userController.getUserDetails);
router.get('/' + CONFIG.routes.username, userController.getUserByUsername);

module.exports = router;