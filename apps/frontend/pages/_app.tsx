import type { AppProps } from "next/app";
import Head from "next/head";

import "./styles.css";

import { DarkModeToggle } from "components/ui/dark-toggle";
import AuthProvider from "lib/providers/authProvider";

import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>TODO App</Head>
      <main className="background-grad">
        <h1 className="fixed bottom-3 right-5 font-extrabold text-2xl">
          TODO.
        </h1>
        <div className="fixed top-3 right-3">
          <DarkModeToggle />
        </div>
        {/* TODO: should be using layouts to use this only on Auth layouts */}
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
        <Toaster position="bottom-left" richColors />
      </main>
    </>
  );
}
