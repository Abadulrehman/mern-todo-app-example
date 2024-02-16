import { Request, Response } from 'express';

import User from '../../models/auth/user';

import { createToken } from '../../utils/token';
import { signUpFormSchema } from '@mern-todo-app/models';

const signup = async (req: Request, res: Response) => {
  try {
    const validation = signUpFormSchema.safeParse(req.body);

    if (!validation.success) {
      return res
        .status(400)
        .send({
          'Errors in input data:': validation.error.formErrors.fieldErrors,
        });
    }

    const { email, password } = validation.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    const user = await User.create({ email, password });
    const token = createToken(user._id.toString());

    res.cookie('token', token, {
      httpOnly: false,
    });

    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error creating user' });
  }
};

export default signup;
