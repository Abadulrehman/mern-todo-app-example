import { getBackendUrl } from "lib/utils";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export async function logIn(email: string, password: string) {
  try {
    await axios.post(
      `${getBackendUrl()}/login`,
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );
    return true;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401) {
      toast.error("Invalid email or password");
    } else {
      console.error(error);
      toast.error("Error logging in. Try again later.");
    }
  }
  return false;
}
