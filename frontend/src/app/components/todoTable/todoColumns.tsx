import { Todo } from "@/app/types/todo";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";

export function TodoColumns(options: {
  onDelete: (id: number) => void;
  onStatusChange: (id: number, checked: boolean) => void;
  onEdit?: (todo: Todo) => void;
}): ColumnDef<Todo>[] {
  const { onDelete, onStatusChange, onEdit } = options;

  return [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const todo = row.original as Todo;

        return (
          <Checkbox
            checked={todo.status}
            onCheckedChange={(checked) =>
              onStatusChange(todo.id, checked as boolean)
            }
          />
        );
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Priority
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const todo = row.original as Todo;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit && onEdit(todo)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => onDelete(todo.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
