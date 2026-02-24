const express = require("express");
const router = express.Router();
const User = require("../MODELS/user.js");
const wrapAsync = require("../utils/Wrapasync");
const passport = require("passport");

const userController = require("../controllers/user");

router.get("/register", userController.renderRegisterForm);

router.post("/register", wrapAsync(userController.signup));

router.get("/login", userController.renderLoginForm);

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
}), userController.login);

router.get("/logout", userController.logout);

module.exports = router;
