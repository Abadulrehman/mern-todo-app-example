import { Request, Response } from "express";
import Todo from "../../models/todo/todo";
import { getUserFromRequest } from "../../utils/token";
import { todoUpdateFormSchema } from "@mern-todo-app/models";

const updateTodo = async (req: Request, res: Response) => {
  try {
    const user = await getUserFromRequest(req);

    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const validation = todoUpdateFormSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).send({ "Errors in input data:": validation.error.formErrors.fieldErrors });
    }

    const { todoId, title, completed } = req.body;

    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).send({ message: "Todo not found" });
    }

    if (todo.user?._id.toString() !== user.id){
      return res.status(403).send({ message: "Unauthorized" });
    }

    if (title !== undefined && title.length > 0){
      todo.title = title;
    }

    if (completed !== undefined){
      todo.completed = !!completed;
    }

    await todo.save();

    res.status(201).send({ message: "Todo updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error updating todo" });
  }
};

export default updateTodo;
