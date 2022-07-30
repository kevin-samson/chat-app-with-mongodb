import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "authenticated") router.push("/dashboard");
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {status === "authenticated" ? (
          <>
            <div className="w-full h-screen flex flex-col items-center justify-center bg-[#303940] space-y-10">
              <ReactLoading
                type={"spin"}
                color={"#7368EF"}
                height={"120px"}
                width={"120px"}
              />
              <div className="text-grey-400 text-5xl">Loading</div>
            </div>
          </>
        ) : (
          <>
            Not connected
            <button onClick={() => signIn("google")}>
              Sign in with Google
            </button>
          </>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;

    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
