"use client";

import { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import { TodoTable } from "./todoTable/todoTable";
import { TodoColumns } from "./todoTable/todoColumns";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogPortal, DialogTitle } from "@radix-ui/react-dialog";
import TodoForm from "./todoForm";

const TodoWrapper = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [isOpenEdit, setIsOpenEdit] = useState<boolean | null>(false);
  const [currentEditTodo, setCurrentEditTodo] = useState<Todo | null>(null);
  const todoColumns = TodoColumns({
    onDelete: handleDelete,
    onStatusChange: handleStatusChange,
    onEdit,
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  function handleDelete(id: number) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const filteredTodos = todos?.filter((todo) => todo.id != id);
        setTodos(filteredTodos);
      })
      .catch((err) => console.error(err));
  }

  function handleStatusChange(id: number, checked: boolean) {
    console.log(id, checked);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        status: checked,
      }),
    })
      .then((res) => {
        setTodos((prev) =>
          prev?.map((todo) =>
            todo.id === id ? { ...todo, status: checked } : todo
          )
        );
      })
      .catch((err) => console.error(err));
  }

  function onEdit(todo: Todo) {
    setIsOpenEdit((prev) => !prev);
    setCurrentEditTodo(todo);
  }

  if (!todos) return;
  return (
    <div className="max-w-200 mx-auto">
      <TodoTable data={todos} columns={todoColumns} />
      {isOpenEdit && currentEditTodo && (
        <Dialog open={!!isOpenEdit} onOpenChange={() => setIsOpenEdit(null)}>
          <DialogPortal>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Todo</DialogTitle>
                <TodoForm todo={currentEditTodo} action="PATCH" />
              </DialogHeader>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </div>
  );
};

export default TodoWrapper;
