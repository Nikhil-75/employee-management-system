const { param, body } = require("express-validator");

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

exports.addEmpValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("salary").notEmpty().withMessage("Salary is required").isNumeric().withMessage("Salary must be a number"),
  body('image').notEmpty().withMessage("Image is required").isURL().withMessage("Image must be a valid URL"),
  body("role").notEmpty().withMessage("Role is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("mobile").notEmpty().withMessage("Mobile number is required").isMobilePhone().withMessage("Enter a valid mobile number"),
  body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email").toLowerCase(),
]

exports.empId = [
  param("id").notEmpty().withMessage("ID is required").isMongoId().withMessage("Enter valid Mongo ID"),
]