"use client";

import { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import { TodoTable } from "./todoTable/todoTable";
import { TodoColumns } from "./todoTable/todoColumns";
import { DialogPortal } from "@radix-ui/react-dialog";
import TodoForm, { TodoFormProps } from "./todoForm";
import TodoFilters from "./todoFilters";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
const TodoWrapper = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFiletedTodos] = useState<Todo[]>(todos ?? []);
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

  useEffect(() => {
    setFiletedTodos(todos);
  }, [todos]);

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

  function handleTodoFormAction(action: TodoFormProps["action"], data: Todo) {
    if (action == "POST") {
      setTodos([...todos, data]);
    } else if (action === "PATCH") {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === data.id ? data : todo))
      );
    }
  }

  function onEdit(todo: Todo) {
    setIsOpenEdit((prev) => !prev);
    setCurrentEditTodo(todo);
  }
  if (!todos) return;
  return (
    <div className="max-w-200 mx-auto mt-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl uppercase mb-4">Todo</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon /> Add todo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Todo</DialogTitle>
            </DialogHeader>
            <TodoForm action="POST" handleResult={handleTodoFormAction} />
          </DialogContent>
        </Dialog>
      </div>
      <TodoFilters todos={todos} setTodos={setFiletedTodos} />
      <TodoTable data={filteredTodos} columns={todoColumns} />
      {isOpenEdit && currentEditTodo && (
        <Dialog open={!!isOpenEdit} onOpenChange={() => setIsOpenEdit(null)}>
          <DialogPortal>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Todo</DialogTitle>
              </DialogHeader>
              <TodoForm
                todo={currentEditTodo}
                action="PATCH"
                handleResult={handleTodoFormAction}
              />
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </div>
  );
};

export default TodoWrapper;
