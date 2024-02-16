import { Request, Response } from "express";
import Todo from "../../models/todo/todo";
import { getUserFromRequest } from "../../utils/token";

const createTodo = async (req: Request, res: Response) => {
  try {
    const user = await getUserFromRequest(req);

    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const { title } = req.body;

    if (!title) {
      return res.status(400).send({ message: "Title is required" });
    }

    const todo = new Todo({
      title,
      user: user.id,
    });

    await todo.save();

    res.status(201).send({ message: "Todo created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error creating todo" });
  }
};

export default createTodo;
