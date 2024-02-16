import { LuPlusCircle } from "react-icons/lu";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import TodoGroup from "./todoGroup";
import { useState } from "react";
import TodoDialog from "./todoDialog";
import { EditData } from "./todoForm";
import { useListTodo } from "lib/services/todo/list";

const TodoView = () => {
  const { data, isLoading, mutate: reloadTodoList } = useListTodo();

  const [dialogOpen, setDialogOpen] = useState(false);

  const [editData, setEditData] = useState<EditData | undefined>();

  return (
    <div className="flex flex-col justify-center w-screen mx-4 md:w-80 md:mx-0 items-center gap-2">
      <Label className="text-lg font-bold">What you have To Do</Label>
      <TodoGroup
        todoList={data ?? []}
        loading={isLoading}
        onTodoEdit={(id: string, title: string) => {
          setEditData({ id, title });
          setDialogOpen(true);
        }}
        onTodoSave={async () => {
          await reloadTodoList();
        }}
      />
      <span className="flex justify-end w-full">
        <Button
          variant="outline"
          size="icon"
          className="me-4"
          aria-label="Add Todo"
          disabled={isLoading}
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          <LuPlusCircle size={22} />
        </Button>
      </span>
      <TodoDialog
        open={dialogOpen}
        editData={editData}
        onClose={async () => {
          setDialogOpen(false);
          setEditData(undefined);
          await reloadTodoList();
        }}
      />
    </div>
  );
};

export default TodoView;
