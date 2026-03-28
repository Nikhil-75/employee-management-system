const express = require("express");
const { registerUser, UserProfile, loginUser, addEmployee, allEmployees, DeleteEmployee, GetEMployeeDetails, UpdateEMployeeRecord  } = require("../controllers/main.controller");
const { registerUserValidation,loginUserValidation, addEmpValidation, empId } = require("../validations/main.validation");
const { ValidationMiddleware } = require("../middleware/ValidationMiddleware");
const { AuthValidationMiddleware } = require("../middleware/AuthValidation");
const router = express.Router();

router.route("/register")
.post(registerUserValidation, ValidationMiddleware, registerUser);

router.route("/login")
.post(loginUserValidation, ValidationMiddleware, loginUser);

router.use(AuthValidationMiddleware);

router.route('/profile')
.get(UserProfile)

router.route('/add-emp')
.post(addEmpValidation, ValidationMiddleware, addEmployee)

router.route('/emp/:id')
.get(empId, ValidationMiddleware, GetEMployeeDetails)
.delete(empId, ValidationMiddleware, DeleteEmployee)
.put([...empId, addEmpValidation], ValidationMiddleware, UpdateEMployeeRecord)


router.route('/all-emp')
.get(allEmployees)

module.exports = router;
