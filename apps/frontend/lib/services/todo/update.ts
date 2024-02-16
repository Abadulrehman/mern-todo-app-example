import { getBackendUrl } from "lib/utils";
import axios from "axios";
import { toast } from "sonner";

export const updateTodo = async (
  id: string,
  title: string | null,
  completed: boolean | null
) => {
  try {
    await axios.put(
      getBackendUrl() + "/todo/update",
      {
        todoId: id,
        title,
        completed,
      },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error(error);
    toast.error("Error updating todo. Try again later.");
  }
};
