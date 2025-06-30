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

export const login = (req: Request, res:Response) => {
  res.send("login route")
};

export const logout = (req: Request, res:Response) => {
  res.send("logout route")
};