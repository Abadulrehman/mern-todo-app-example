import { Request, Response } from "express";

import User from "../../models/auth/user";

import { createToken } from "../../utils/token";

const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // TODO: prolly could do some email and password validation here
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Both email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const user = await User.create({ email, password });
    const token = createToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: false,
    });

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error creating user" });
  }
};

export default signup;
