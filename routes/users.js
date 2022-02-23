const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync.js");
const { isLoggedIn } = require("../middleware.js");
const userController = require("../controllers/user.js");


router.route("/register")
    .get(userController.renderRegisterForm)
    .post(catchAsync(userController.registerUser))

router.route("/login")
    .get(userController.renderLoginForm)
    .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), userController.loginUser)

router.get("/logout", isLoggedIn, userController.renderLogoutForm)

module.exports = router;
