import { getBackendUrl } from "lib/utils";
import axios from "axios";
import { toast } from "sonner";
import { mutate } from "swr";

export const createTodo = async (title: string) => {
  try {
    await axios.put(
      getBackendUrl() + "/todo/create",
      {
        title,
      },
      {
        withCredentials: true,
      }
    );

    await mutate("/todo");
  } catch (error) {
    console.error(error);
    toast.error("Error creating todo. Try again later.");
  }
};
