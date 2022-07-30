import { useSession } from "next-auth/react";
import { useState } from "react";
import NavBar from "../components/NavBar";
import Conversations from "../components/conversations/Conversations";
import Profile from "../components/Profile";
import ChatSection from "../components/chatsection/ChatSection";
import FriendReq from "../components/friendreq";
import ReactLoading from "react-loading";
import { useRouter } from "next/router";
import { useConversations } from "../context/ConvoProvider";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [selectednav, setSelectednav] = useState("conversations");
  const { conversations, setConversations } = useConversations();
  const router = useRouter();

  if (status === "loading")
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#303940] space-y-10">
        <ReactLoading
          type={"spin"}
          color={"#7368EF"}
          height={"120px"}
          width={"120px"}
        />
        <div className="text-grey-400 text-5xl">Loading</div>
      </div>
    );
  if (status === "unauthenticated") router.push("/");

  return (
    <div className="flex md:flex-row h-screen w-screen bg-[#303940]">
      <NavBar selectednav={selectednav} setSelectednav={setSelectednav} />
      {/* people list */}
      <div className="flex flex-col h-full bg-[#303940] p-5 space-y-6 w-full md:w-[33rem]">
        {
          {
            profile: <Profile id={session?.user.id} />,
            conversations: <Conversations />,
            friendreq: <FriendReq />,
          }[selectednav]
        }
      </div>
      {/* chat area */}
      <div
        className={`fixed md:relative top-0 h-screen w-screen md:flex md:w-full md:h-full ${
          conversations?.selected ? null : "translate-x-full"
        } md:transform-none bg-darker transform  transition-all duration-300`}
      >
        <ChatSection />
      </div>
    </div>
  );
}
