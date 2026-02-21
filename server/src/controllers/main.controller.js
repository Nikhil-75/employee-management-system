const { UserModel } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_auth_secret = "@#$%^&*()(^^&*()";
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
        return res.status(200).send({user})
       
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
