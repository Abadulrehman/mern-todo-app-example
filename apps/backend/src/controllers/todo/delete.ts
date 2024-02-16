import { Request, Response } from "express";
import Todo from "../../models/todo/todo";
import { getUserFromRequest } from "../../utils/token";

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const user = await getUserFromRequest(req);

    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const { todoId } = req.body;

    if (!todoId) {
      return res.status(400).send({ message: "todoId is required" });
    }

    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).send({ message: "Todo not found" });
    }

    if (todo.user?._id.toString() !== user.id){
      return res.status(403).send({ message: "Unauthorized" });
    }

    await todo.deleteOne();

    res.status(201).send({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting todo" });
  }
};

export default deleteTodo;
