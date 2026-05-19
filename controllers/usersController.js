import { User } from "../models/User.js"; // Interact with database
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from 'jsonwebtoken'
import { generateToken } from "../utils/generateToken.js";


// Common Routes

export const signUp = async (req, res) => {
  // const fullName = req.body.fullName
  // const age = req.body.age
  // const email = req.body.email
  // const password = req.body.password

  const { fullName, age, email, password } = req.body;
  // email : bob@gmail.com
  try {
    // IF email exist => user already created
    // ELSE => new user account

    // Query : GET : READ ===> find() // findById() // findOne()
    const existingUser = await User.findOne({ email }); // to get a user from the collection (users) that has same email value that received with request

    if (existingUser) {
      res.status(400).json({ message: "User already exist!" });
    }

    // 1 / Validation (Don't trust Frontend) ----------------------------

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required !" });
    }

    if (!validator.isEmail(email)) {
      res.status(400).json({ message: "Invalid Email !" });
    }

    if (!validator.isLength(password, { min: 8 })) {
      res
        .status(400)
        .json({ message: "Password need to be more than 8 digits !" });
    }

    if (!validator.isNumeric(age)) {
      res.status(400).json({ message: "Invalid age value !" });
    }

    // Email is Valid

    // 2 / Security : Hash Password using Bcrypt ---------------------

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      age,
      email,
      password: hashedPassword,
    }); // save a new user based on the schema structure

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error !" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // IF user exist / not exist

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(400).json({ message: "Bad credentials !" });
    }

    // Validation

    // Email is Valid

    if (!validator.isEmail(email)) {
      res.status(400).json({ message: "Invalid email, try with another one" });
    }

    // Password check (Length)

    if (!validator.isLength(password, { min: 8 })) {
      res
        .status(400)
        .json({ message: "Password incorrect, must be at least 8 characters" });
    }

    // Compare password

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials !" });
    }

    // Generates JWT ( Token )
    // sign(PAYLOAD , SECRET_KEY , EXPIRES_IS)
    // const token = jwt.sign({id : existingUser._id , email : existingUser.email} , 'super_secret_key' , {expiresIn : '1d'})
    const token = generateToken({id : existingUser._id , email : existingUser.email , role : existingUser.role})
    console.log(token)
    res.status(200).json({ user : existingUser , token});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(400).json({ message: "User not found !" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error !" });
  }
};



// Admin Routes


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error !" });
  }
};


export const deactivate = async (req , res) => {

  const { id } = req.params

  try {

    const user = await User.findByIdAndUpdate(id , { isActive : false } , { new : true })

    res.status(200).json({message : 'User account deactivated' , user})
    
  } catch (error) {
    res.status(500).json({message : 'Internal server error'})
  }
}
