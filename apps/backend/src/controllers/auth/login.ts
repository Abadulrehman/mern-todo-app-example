import { Request, Response } from "express";

import User from "../../models/auth/user";

import { compare } from "bcryptjs";
import { createToken } from "../../utils/token";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Both email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // create to token to keep user logged in
    const token = createToken(user._id.toString());
    res.cookie("token", token, {
      httpOnly: false,
    });

    res.status(200).send({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error logging in" });
  }
};

export default login; 