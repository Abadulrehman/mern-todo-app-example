import { getBackendUrl } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

export async function signUp(email: string, password: string) {
  try {
    await axios.post(
      `${getBackendUrl()}/signup`,
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );

    // TODO: handle password taken etc
    toast.success("Signed up successfully. Logging in...");

    return true;
  } catch (error) {
    toast.error("Error signing up");
    console.error(error);
  }
  return false;
}
