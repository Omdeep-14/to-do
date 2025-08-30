import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/crudControllers.js";

const crudRouter = express.Router();

crudRouter.post("/", createTodo);
crudRouter.get("/", getTodos);
crudRouter.put("/:id", updateTodo);
crudRouter.delete("/:id", deleteTodo);

export default crudRouter;
