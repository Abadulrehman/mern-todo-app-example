import { deleteCookie } from "cookies-next";

export function logOut() {
  deleteCookie("token");
  localStorage.removeItem("user");
  window.location.reload();
}
