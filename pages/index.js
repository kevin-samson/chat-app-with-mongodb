import clientPromise from "../lib/mongodb";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";
import { MdOutlineChat } from "react-icons/md";
import help from "../public/help.jpeg";
import Image from "next/image";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  if (status === "authenticated") router.push("/dashboard");
  return (
    <div>
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
          <main className="h-screen bg-gradient-to-b from-purple-800 to-gray-700 mx-0 overflow-auto">
            <div className="px-5 py-10 md:px-10 md:px-15 flex flex-col">
              <div className="flex items-center">
                <MdOutlineChat className="text-grey-300 h-7 w-7" />
                <h1 className="text-xl text-grey-300 font-bold">Chat</h1>
                <h2 className="text-xl text-grey-300 ml-1">app</h2>
              </div>
              <div className="md:flex">
                <div className="flex flex-col mt-24 mx-14 ">
                  <h1 className="flex flex-col text-justify text-grey-300 text-5xl ">
                    Have your best chat
                  </h1>
                  <h2 className="text-grey-300 mt-5">Fast,easy and free</h2>
                  <button
                    onClick={() => signIn("google")}
                    className="bg-purple-600 rounded-xl p-3 mt-5 w-2/3 h-auto"
                  >
                    <h3 className="text-grey-300">Sign in with Google</h3>
                  </button>
                </div>
                <div className="mt-12">
                  <Image
                    src={help}
                    height={800}
                    className="rounded-lg object-contain w-1/2 h-1/2"
                  />
                </div>
              </div>
            </div>
            {/* <div className="mx-20">
              Not connected
              <button onClick={() => signIn("google")}>
                Sign in with Google
              </button>
            </div> */}
          </main>
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
