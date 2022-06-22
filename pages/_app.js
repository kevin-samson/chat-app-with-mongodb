import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ConversationProvider } from "../context/ConvoProvider";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ConversationProvider>
        <Component {...pageProps} />
      </ConversationProvider>
    </SessionProvider>
  );
}
