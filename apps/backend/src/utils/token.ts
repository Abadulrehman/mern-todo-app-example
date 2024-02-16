import { Request } from "express";
import { sign, verify } from "jsonwebtoken";
import User from "../models/auth/user";

// Create a token for the user
export const createToken = (userId: string) => {
  return sign({ userId }, process.env.JWT_TOKEN_KEY || '', {
    // token valid for 3 days
    expiresIn: 3 * 24 * 60 * 60,
  });
};

// Get user from the request cookies
export const getUserFromRequest = async (req: Request) => {
  const token = req.cookies.token;

  if (!token) {
    return null;
  }

  const authReq = verify(token, process.env.JWT_TOKEN_KEY || '');

  if (!authReq || typeof authReq === "string") {
    return null;
  }

  if (!authReq.userId) {
    return null;
  }

  const user = await User.findById(authReq.userId);

  return user;
};
