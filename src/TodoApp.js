import React from "react";
import useSWR from "swr";
import "./App.css";

const todosEndpoint = "https://jsonplaceholder.typicode.com/todos";

const getTodo = async (id) => {
  const response = await fetch(`${todosEndpoint}/${id}`);
  return await response.json();
};
const updateTodo = async (id, todo) => {
  const response = await fetch(`${todosEndpoint}/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(todo),
  });
  return await response.json();
};
const TodoApp = () => {
  const todoId = 1;
  const key = `${todosEndpoint}/${todoId}`;
  const { data: todo, mutate } = useSWR(key, () => getTodo(todoId));
  const toggleCompleted = async () => {
    const newTodo = {
      ...todo,
      completed: !todo.completed,
    };
    await updateTodo(todoId, newTodo);
    mutate(newTodo);
  };
  if (!todo) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{todo.title}</p>
      <div>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          value="completed"
          checked={todo.completed}
          onChange={toggleCompleted}
        />
        <label htmlFor="completed">Completed</label>
      </div>
    </div>
  );
};
export default TodoApp;
