import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

import api from "../lib/axios.js";

function TodoInput() {
  const [todoInp, setTodoInp] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const completed = todos.filter((t) => t.isCompleted).length;
  const incompleted = todos.filter((t) => !t.isCompleted).length;
  const total = todos.length;

  const abortRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    const fetchTodos = async () => {
      try {
        setLoading(true);
        const getTodos = await api.get("/crudTodos", {
          signal: controller.signal,
        });
        setTodos(getTodos.data.data);
      } catch (err) {
        if (api.isCancel?.(err) || err.name === "CanceledError") {
          console.log("Request Cancelled", err.message);
        } else {
          console.log("Fetch error", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();

    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todoInp.trim()) {
      alert("please enter todo");
      return;
    }

    try {
      setUpdating(true);
      const res = await api.post("/crudTodos", { text: todoInp });
      setTodos((prev) => [...prev, res.data.data]);
      setTodoInp("");
      setUpdating(false);
    } catch (error) {
      console.log("todo create error", error);
    }
  };

  const handleToggle = async (id) => {
    const todoToUpdate = todos.find((t) => t._id === id);
    if (!todoToUpdate) return;

    try {
      const res = await api.put(`/crudTodos/${id}`, {
        ...todoToUpdate,
        isCompleted: !todoToUpdate.isCompleted,
      });
      setTodos((prev) => prev.map((t) => (t._id === id ? res.data.data : t)));
      console.log("todo updated");
    } catch (error) {
      console.log("error in updating todo", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/crudTodos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id != id));
      console.log("todo deleted successfully");
    } catch (error) {
      console.log("error in deleting todo", error);
    }
  };

  return (
    <div className="flex items-center justify-center p-2">
      <div>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={todoInp}
            onChange={(e) => setTodoInp(e.target.value)}
            className="p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 border-2 border-black rounded-lg italic "
            placeholder="Enter your todo here"
          />

          <button
            className={
              updating
                ? "hidden"
                : "bg-gray-600 text-white hover:bg-gray-400 rounded-lg px-4 py-2 transition duration-300"
            }
            type="submit"
          >
            Add
          </button>
        </form>

        <h1>Your Todos</h1>

        <ul>
          {todos.length === 0 ? (
            <p>No todos yet</p>
          ) : (
            todos.map((todo) => (
              <li key={todo._id} className="list-disc">
                <div className="flex gap-2">
                  <div
                    className={`mr-4 ${
                      todo.isCompleted
                        ? "line-through text-gray-500"
                        : "text-black"
                    } `}
                  >
                    {todo.text}
                  </div>
                  <button onClick={() => handleToggle(todo._id)}>
                    {!todo.isCompleted ? "Completed" : "Not Completed"}
                  </button>
                  <button onClick={() => handleDelete(todo._id)}>Delete</button>
                </div>
              </li>
            ))
          )}
        </ul>
        <div className="flex-col ga--2 justfy-center items-center w-full mt-10">
          <h1 className="text-center">Stats</h1>
          <div className="flex  justify-center items-center gap-4">
            <div className="border-gray-900 border-r-2 pr-3 ">
              <div>Completed</div>
              <div>{completed}</div>
            </div>
            <div className="border-gray-900 border-r-2 pr-3 ">
              <div>Incomplete</div>
              <div>{incompleted}</div>
            </div>
            <div>
              <div>Total</div>
              <div>{total}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoInput;
