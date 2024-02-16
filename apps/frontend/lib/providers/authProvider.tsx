import axios, { AxiosError } from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { getBackendUrl } from "../utils";
import { toast } from "sonner";

type AuthContextType = {
  userId: string;
  userEmail: string;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  userId: "",
  userEmail: "",
  loading: false,
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // Check if user is logged in, and if login is valid
  // if not not, log out and redirect to login
  useEffect(() => {
    setLoading(true);

    let ignore = false;

    // Do not trigger if on a public page
    if (
      !ignore &&
      router.pathname !== "/login" &&
      router.pathname !== "/signup"
    ) {
      // if not token is present, redirect to login
      if (!getCookie("token")) {
        router.push("/login");
      }

      // check token
      axios
        .post(`${getBackendUrl()}/`, {}, { withCredentials: true })
        .then((response) => {
          const { loggedIn, user, userEmail } = response.data;

          if (!ignore) {
            // if not logged in, delete the token and redirect to login
            if (!loggedIn) {
              deleteCookie("token");
              router.push("/login");
            } else {
              setUser(user);
              setUserEmail(userEmail);

              const currentUser = localStorage.getItem("user");

              // avoid repetitive login notifications
              if (currentUser !== user) {
                localStorage.setItem("user", user);
                toast.success("Logged in successfully");
                toast(`Welcome ${user}`);
              }
            }
          }
        })
        .catch((error) => {
          console.error(error);

          const err = error as AxiosError;

          if (err.code === "ERR_NETWORK") {
            toast.error("Error connecting to the server.");
          } else {
            toast.error("Error logging in. Please try again.");
          }

          deleteCookie("token");
          router.push("/login");
        })
        .finally(() => {
          setLoading(false);
        });
      return () => {
        ignore = true;
      };
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ userId: user, userEmail, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
