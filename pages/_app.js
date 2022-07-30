import Head from "next/head";
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
        <Head>
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <title>Chat App</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <Component {...pageProps} />
      </ConversationProvider>
    </SessionProvider>
  );
}
