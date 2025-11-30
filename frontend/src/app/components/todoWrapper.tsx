"use client";

import { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import { TodoTable } from "./todoTable/todoTable";
import { TodoColumns } from "./todoTable/todoColumns";

const TodoWrapper = () => {
  const [todos, setTodos] = useState<Todo[]>();

  useEffect(() => {
    fetch(`http://localhost:5000/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  if (!todos) return;
  return (
    <div className="max-w-200 mx-auto">
      <TodoTable data={todos} columns={TodoColumns} />
    </div>
  );
};

export default TodoWrapper;
