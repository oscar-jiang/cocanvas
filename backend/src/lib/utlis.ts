import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {Response} from "express";

export const generateToken = (userId : String, res: Response) : String  => {

  // First generate a token using JWT secret
  dotenv.config();
  const jwtSecret : string | undefined = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT secret is not defined in environment variables");
  }

  const token : String = jwt.sign({userId}, jwtSecret, {
    expiresIn:"7d",
  })

  // Then we send it to a user with a cookie (HTTPS COOKIE) expires in 7 days (the user will have to login again after 7 days)
  res.cookie("jwtToken", token,  {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks from cross site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
}