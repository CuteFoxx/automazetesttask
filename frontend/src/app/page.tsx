import TodoWrapper from "./components/todoWrapper";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo app",
  description: "This is test task created for automaze",
};

export default function Home() {
  return (
    <div>
      <TodoWrapper />
    </div>
  );
}
