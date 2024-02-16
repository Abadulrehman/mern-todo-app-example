import { Card } from "../ui/card";
import TodoItem from "./todoItem";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import { Todo } from "@/lib/services/todo/types";

type TodoGroupProps = {
  todoList: Todo[];
  loading?: boolean;
  onTodoEdit: (id: string, title: string) => void;
  onTodoSave: () => Promise<void>;
};

const TodoGroup: React.FC<TodoGroupProps> = (props) => {
  const { todoList, loading } = props;

  if (loading) {
    return (
      <Card className="flex flex-col w-full justify-center items-center gap-2 p-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </Card>
    );
  }

  if (todoList.length === 0) {
    return (
      <Card className="flex flex-col w-full justify-center items-center gap-2 p-4">
        <Label>You&apos;re all caught up!</Label>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col w-full max-h-80 gap-2 p-4 pe-3 overflow-y-auto hide-scroll-bar">
      <ul className="divide-y divide-border">
        {todoList.map((todo) => (
          <TodoItem
            key={todo._id}
            id={todo._id}
            title={todo.title}
            complete={todo.completed}
            onEdit={props.onTodoEdit}
            onSave={props.onTodoSave}
          />
        ))}
      </ul>
    </Card>
  );
};

export default TodoGroup;
