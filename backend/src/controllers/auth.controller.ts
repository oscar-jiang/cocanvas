import {Request , Response} from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req: Request, res :Response) : Promise<any> => {
  const {fullName,email,password} = req.body;
  try {
    if (password.length < 6) {
      return res.status(400).json({error: "Password is too short"});
    }

    const user = await User.findOne({email});

    if (user) return res.status(400).json({error: "User already exists"});

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    })

    if (newUser) {
      // generate jwt token here

    } else {
      res.status(401).json({error: "Invalid User Data"});
    }
  } catch (e) {

  }
};

export const login = (req: Request, res:Response) => {
  res.send("login route")
};

export const logout = (req: Request, res:Response) => {
  res.send("logout route")
};