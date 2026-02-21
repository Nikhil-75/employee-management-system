const express = require("express");
const { registerUser, UserProfile, loginUser } = require("../controllers/main.controller");
const { registerUserValidation,loginUserValidation } = require("../validations/main.validation");
const { ValidationMiddleware } = require("../middleware/ValidationMiddleware");
const { AuthValidationMiddleware } = require("../middleware/AuthValidation");
const router = express.Router();

router.route("/register")
.post(registerUserValidation, ValidationMiddleware, registerUser);

router.route('/profile')
.get(AuthValidationMiddleware, UserProfile)

router.route("/login")
.post(loginUserValidation, ValidationMiddleware, loginUser);

module.exports = router;
