import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {Response} from "express";

export const generateToken = (userId, res: Response) => {

  // First generate a token using JWT secret
  dotenv.config();
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn:"7d",
  })

  // Then we send it to a user with a cook (HTTPS COOKIE) expires in 7 days (the user will have to login again after 7 days)
  res.cookie("token", token,  {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks from cross site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
}