import {
  LuAlertCircle,
  LuCheckSquare,
  LuPencil,
  LuSquare,
  LuTrash,
} from "react-icons/lu";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useEffect, useRef, useState } from "react";
import { setDataAttribute } from "@/lib/utils";
import { deleteTodo } from "@/lib/services/todo/delete";
import { updateTodo } from "@/lib/services/todo/update";

type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  onEdit: (id: string, title: string) => void;
  onSave: () => Promise<void>;
};

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { id, title, complete } = props;

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const labelRef = useRef<HTMLLabelElement>(null);

  // If status changes, set appropriate data attribute on the element
  useEffect(() => {
    if (labelRef.current) {
      if (complete) {
        setDataAttribute(labelRef.current, "complete", "true");
      } else {
        setDataAttribute(labelRef.current, "complete", "false");
      }
    }
  }, [complete]);

  // if confirmDelete is true, set it to false after 3 seconds
  useEffect(() => {
    if (confirmDelete) {
      const timeout = setTimeout(() => {
        setConfirmDelete(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [confirmDelete]);

  return (
    <li className="flex w-full justify-between items-center py-2 first:pt-0 last:pb-0">
      <Label
        className="data-[complete=true]:text-black/50 data-[complete=true]:line-through"
        ref={labelRef}
      >
        {title}
      </Label>
      <span className="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Edit Todo"
          disabled={isDeleting}
          onClick={() => {
            props.onEdit(id, title);
          }}
        >
          <LuPencil size={16} />
        </Button>
        <Button
          variant={confirmDelete ? "destructive" : "ghost"}
          size="icon"
          aria-label="Delete Todo"
          className="transition-colors duration-150 ease-in-out"
          disabled={isDeleting}
          onClick={async () => {
            if (confirmDelete) {
              setIsDeleting(true);
              await deleteTodo(id);
              await props.onSave();
              setIsDeleting(false);
            } else {
              setConfirmDelete(true);
            }
          }}
        >
          {confirmDelete ? <LuAlertCircle size={20} /> : <LuTrash size={16} />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Mark as complete"
          disabled={isUpdating || isDeleting}
          onClick={async () => {
            setIsUpdating(true);
            await updateTodo(id, "", !complete);
            await props.onSave();
            setIsUpdating(false);
          }}
        >
          {complete ? <LuCheckSquare size={22} /> : <LuSquare size={22} />}
        </Button>
      </span>
    </li>
  );
};

export default TodoItem;
