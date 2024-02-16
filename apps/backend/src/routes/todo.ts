import { Router } from "express";

import createTodo from "../controllers/todo/create";
import listTodo from "../controllers/todo/list";
import updateTodo from "../controllers/todo/update";
import deleteTodo from "../controllers/todo/delete";

const router = Router();

router.get("/todo", listTodo);
router.put("/todo/create", createTodo);
router.put("/todo/update", updateTodo);
router.post("/todo/delete", deleteTodo);

export default router;
