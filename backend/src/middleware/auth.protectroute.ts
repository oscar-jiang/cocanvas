import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user.model';
import {NextFunction, Request, Response} from "express";

export const protectRoute = async (req: Request, res :Response, next: NextFunction) : Promise<any> => {
  try {
    // Check to see if there is a token saved as a cookie
    const token : string = req.cookies.jwtToken;
    if (!token) {
      return res.status(401).json({message: "Unauthorized - No Token Provided"});
    }

    // We are then going to check if the cookie matches
    const jwtSecret :string | undefined = process.env.JWT_SECRET;
    if (!jwtSecret ) {
      throw new Error("JWT Secret not provided");
    }
    const decoded:string|JwtPayload = jwt.verify(token, jwtSecret);
    if (!decoded || typeof decoded === "string") {
      return res.status(401).json({message: "Unauthorized - Invalid Token"});
    }

    // Then we find the User from the database given the decoded UserId
    const userId : string = decoded.userId;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(400).json({message: "User not found"});
    }

    (req as any).user = user;

    next();

  } catch (e) {
    console.log("Error in protectRoute: ", e);
    res.status(500).json({message: "Internal Server Error"});
  }
}