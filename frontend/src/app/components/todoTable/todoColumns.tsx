import { Todo } from "@/app/types/todo";
import { ColumnDef } from "@tanstack/react-table";

export const TodoColumns: ColumnDef<Todo>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
];
