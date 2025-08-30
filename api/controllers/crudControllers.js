import mongoose from "mongoose";
import { Todo } from "../models/todos.db.js";

export const createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const newTodo = await Todo.create({ text });

    res.status(201).json({
      success: true,
      data: newTodo,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, isCompleted } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { text, isCompleted },
      { new: true }
    );
    res.status(201).json({
      success: true,
      data: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(505).json({
      success: false,
      error: error.message,
    });
  }
};

export const getTodos = async (req, res) => {
  try {
    const Todos = await Todo.find();
    res.status(201).json({
      success: true,
      data: Todos,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      error: error.message,
    });
  }
};
