import { Inter } from "next/font/google";
import { useContext } from "react";

import LoadingSpinner from "@/components/ui/spinner";
import TodoView from "@/components/todo/todoView";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/lib/providers/authProvider";
import { logOut } from "@/lib/services/auth/logout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { userId, loading: userLoading, userEmail } = useContext(AuthContext);

  if (userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className={`flex w-screen h-screen items-center justify-center ${inter.className}`}
    >
      <TodoView />
      {userId && (
        <div className="fixed flex flex-col top-5 left-5">
          <Label>Logged in as {userEmail}</Label>
          <Button
            variant="link"
            className="p-0 w-0 justify-start"
            onClick={logOut}
          >
            Log Out
          </Button>
        </div>
      )}
    </div>
  );
}
