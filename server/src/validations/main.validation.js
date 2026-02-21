const { parm, body } = require("express-validator");

exports.registerUserValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email").toLowerCase(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.loginUserValidation = [
  body("email")
    .notEmpty()   
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email").toLowerCase(),  
  body("password")
    .notEmpty()
    .withMessage("Password is required")  
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
]; 

