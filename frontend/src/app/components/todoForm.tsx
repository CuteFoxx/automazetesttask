"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Todo } from "../types/todo";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(3),
  status: z.boolean(),
  priority: z.number().min(0),
});

interface TodoFormProps {
  action: "POST" | "PATCH";
  todo?: Todo;
}

const TodoForm = ({ todo, action }: TodoFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: todo?.name ?? "",
      status: todo?.status ?? false,
      priority: todo?.priority ?? 0,
    },
  });

  console.log(todo);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const link =
      action == "POST"
        ? `${process.env.NEXT_PUBLIC_API_URL}/todos`
        : `${process.env.NEXT_PUBLIC_API_URL}/todos/${todo?.id}`;

    fetch(link, {
      headers: {
        "Content-Type": "application/json",
      },
      method: action,
      body: JSON.stringify(values),
    }).then((res) => console.log(res));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Todo name</FormLabel>
              <FormControl>
                <Input placeholder="todo name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Todo priority</FormLabel>
              <FormControl>
                <Input type="number" placeholder="priority" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Todo status</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default TodoForm;
