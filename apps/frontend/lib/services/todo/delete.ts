import { getBackendUrl } from "lib/utils";
import axios from "axios";
import { toast } from "sonner";

export const deleteTodo = async (id: string) => {
  try {
    await axios.post(
      getBackendUrl() + "/todo/delete",
      {
        todoId: id,
      },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error(error);
    toast.error("Error deleting todo. Try again later.");
  }
};
