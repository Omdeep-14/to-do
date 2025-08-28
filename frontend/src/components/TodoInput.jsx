import React, { useState } from "react";

function TodoInput() {
  const [todoInp, setTodoInp] = useState("");
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoInp.trim()) {
      alert("please enter todo");
      return;
    }

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: todoInp, isCompleted: false },
    ]);

    setTodoInp("");
  };

  const handleToggle = (id) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );

    setTodos(newTodo);
    setCompleted(todos.filter((t) => t.isCompleted).length);
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    setCompleted(todos.filter((t) => t.isCompleted).length);
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
            className="bg-gray-600 text-white hover:bg-gray-400 rounded-lg px-4 py-2 transition duration-300"
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
              <li key={todo.id} className="list-disc">
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
                  <button onClick={() => handleToggle(todo.id)}>
                    {!todo.isCompleted ? "Completed" : "Not Completed"}
                  </button>
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
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
              <div></div>
            </div>
            <div>
              <div className="border-gray-900 border-r-2 pr-3 ">Incomplete</div>
              <div></div>
            </div>
            <div>
              <div>Total</div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoInput;
