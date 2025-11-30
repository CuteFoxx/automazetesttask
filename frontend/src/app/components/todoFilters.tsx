import { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TodoFiltersProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoFilters = ({ todos, setTodos }: TodoFiltersProps) => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "done" | "undone">(
    "all"
  );

  useEffect(() => {
    let filtered = [...todos];

    if (query.trim()) {
      filtered = filtered.filter((todo) =>
        todo.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (statusFilter === "done") {
      filtered = filtered.filter((todo) => todo.status);
    } else if (statusFilter === "undone") {
      filtered = filtered.filter((todo) => !todo.status);
    }

    setTodos(filtered);
  }, [todos, query, statusFilter, setTodos]);

  const resetFilters = () => {
    setQuery("");
    setStatusFilter("all");
    setTodos(todos);
  };

  return (
    <div className="mb-4 flex gap-2">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search todos"
      />

      <Select
        value={statusFilter}
        onValueChange={(value) =>
          setStatusFilter(value as "all" | "done" | "undone")
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="done">Done</SelectItem>
          <SelectItem value="undone">Undone</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={resetFilters}>Reset</Button>
    </div>
  );
};

export default TodoFilters;
