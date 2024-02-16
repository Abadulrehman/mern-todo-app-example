import { Request, Response } from 'express';
import Todo from '../../models/todo/todo';
import { getUserFromRequest } from '../../utils/token';
import { todoCreateFormSchema } from '@mern-todo-app/models';

const createTodo = async (req: Request, res: Response) => {
  try {
    const user = await getUserFromRequest(req);

    if (!user) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    const validation = todoCreateFormSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).send({ 'Errors in input data:': validation.error.formErrors.fieldErrors });
    }

    const todo = new Todo({
      user: user.id,
      ...validation.data,
    });

    await todo.save();

    res.status(201).send({ message: 'Todo created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error creating todo' });
  }
};

export default createTodo;
