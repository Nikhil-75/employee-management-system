const { UserModel } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { EmpModel } = require("../models/emp.model");
const jwt_auth_secret = "@#$%^&*()(^^&*()";
const {default: randomInt} = require('random-int');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //exist user based on email
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      throw new Error("User Already Registered");
    }
    // password hashing
    const hash_pass = await bcrypt.hash(password, 10);

    // create user
    const user = await UserModel.create({
      name,
      email,
      password: hash_pass,
    });
    const token = jwt.sign({ userId: user._id }, jwt_auth_secret, {
      expiresIn: "1d",
    });
    res.send({ message: "Register Successfully", token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.UserProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user).select('name email -_id')
         const employees = await EmpModel.countDocuments({user: req.user})
        return res.status(200).send({...user.toObject(), total_emp: employees})

       
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user based on email
    const existUser = await UserModel.findOne({ email });
    if (!existUser) {
      throw new Error("User Not Registered");
    }

    // compare password
    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }

    // generate token
    const token = jwt.sign({ userId: existUser._id }, jwt_auth_secret, {
      expiresIn: "1d",
    });

    res.send({ message: "Login Successfully", token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.addEmployee = async(req, res) => {
  try {
    await EmpModel.create({
      ...req.body,
      user: req.user,
      empId: 'EMP'+randomInt(111, 999)+'ID'
    })
    res.status(200).send({message: "Employee Created"})
  } catch (error) {
    res.status(400).send({error: error.message})  
  }
}

exports.allEmployees = async(req,res) => {
  try {
    const employees = await EmpModel.find({user: req.user})
    res.status(200).send({employees})
  } catch (error) {
    res.status(400).send({error: error.message})
  }
}

exports.DeleteEmployee = async(req,res) => {
  try {
    const id = req.params.id
    const dopc = await EmpModel.findByIdAndDelete(id)
    if(!dopc){
      throw new Error("Employee Does Not Exist")
    }
    res.send({message: "Employee Deleted: "})
    
  } catch (error) {
    res.status(400).send({error: error.message})
  }
}

exports.GetEMployeeDetails = async(req,res) => {
  try {
    const id = req.params.id
    const dopc = await EmpModel.findById(id)
    if(!dopc){
      throw new Error("Employee Does Not Exist")
    }
    res.send(dopc)
    
  } catch (error) {
    res.status(400).send({error: error.message})
  }
}


exports.UpdateEMployeeRecord = async(req,res) => {
  try {
    const id = req.params.id
    const dopc = await EmpModel.findByIdAndUpdate(id,{...req.body}, {new: true})
    if(!dopc){
      throw new Error("Employee Does Not Exist")
    }
    res.send({message: "Employee Updated Successfully"})
    
  } catch (error) {
    res.status(400).send({error: error.message})
  }
}
