import { Request, Response } from "express";
import Todo from "../../models/todo/todo";
import { getUserFromRequest } from "../../utils/token";

const listTodo = async (req: Request, res: Response) => {
  try {
    const user = await getUserFromRequest(req);

    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const todoList = await Todo.find({ user: user._id });

    res.status(200).send(todoList);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error listing todo" });
  }
};

export default listTodo;
