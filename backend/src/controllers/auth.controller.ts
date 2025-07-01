import {Request , Response} from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../lib/utlis.js";

export const signup = async (req: Request, res :Response) : Promise<any> => {
  const {fullName,email,password} = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({error: "All fields are required"});
    }

    if (password.length < 6) {
      return res.status(400).json({error: "Password is too short; must be at least 6 characters"});
    }

    // Checking to see the user is already created with the same email
    const user = await User.findOne({email});
    if (user) return res.status(400).json({error: "User already exists"});

    // hash password
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    // Creating the new user
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    })

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id.toString(), res); // User Id is an Object ID in the database but TS is expecting a string
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({error: "Invalid User Data"});
    }
  } catch (e) {
    console.log(`Error creating user creation: ${e}`);
    res.status(500).json({error: "Internal Server Error"});
  }
};

export const login = async (req: Request, res:Response) : Promise<any> => {
  const {email, password} = req.body;
  try {
    // Checking to see the user is already created with the same email
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({error: "Invalid Credentials"});
    }

    // Compare the password that the user has inputted and the password in the database
    const isPasswordCorrect: boolean = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({error: "Invalid Credentials"});
    }

    generateToken(user._id.toString(), res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    })
  } catch (e) {
    console.log(`Error in login controller: ${e}`);
    res.status(500).json({error: "Internal Server Error"});
  }
};

export const logout = async (req: Request, res:Response): Promise<any> => {
  try {
    res.cookie("jwtToken", "", {maxAge: 0})
    res.status(200).json({message: "User logged out successfully."})
  } catch (e) {
    console.log(`Error in logout controller: ${e}`);
    res.status(500).json({error: "Internal Server Error"});
  }
};

export const updateProfile = async (req: Request, res :Response) : Promise<any> => {
  // TODO: use a cloud service to store profile pictures and implement the function
}

export const checkAuth = async (req: Request, res :Response) : Promise<any> => {
  try {
    res.status(200).json((req as any).user);
  } catch (e) {
    console.log(`Error in check Auth: ${e}`);
    res.status(500).json({error: "Internal Server Error"});
  }
}