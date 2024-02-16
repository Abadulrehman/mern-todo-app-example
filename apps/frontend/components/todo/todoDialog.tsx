import { Dialog, DialogContent } from "../ui/dialog";
import TodoForm, { EditData } from "./todoForm";

type TodoDialogProps = {
  open: boolean;
  editData?: EditData;
  onClose: () => void;
};

const TodoDialog: React.FC<TodoDialogProps> = (props) => {
  const { open, onClose } = props;

  return (
    <Dialog open={open}>
      <DialogContent
        className="w-80 p-4"
        onInteractOutside={onClose}
        onEscapeKeyDown={onClose}
      >
        <TodoForm onSubmit={onClose} editData={props.editData} />
      </DialogContent>
    </Dialog>
  );
};

export default TodoDialog;
