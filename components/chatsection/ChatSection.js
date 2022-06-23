import { useEffect, useRef } from "react";
import { useConversations } from "../../context/ConvoProvider";
import TopSection from "./TopSection";
import Pusher from "pusher-js";
import ChatBubbleRe from "./ChatBubbleRe";
import ChatBubbleSe from "./ChatBubbleSe";
import InputBox from "./InputBox";
import useSWR, { mutate } from "swr";
import { useSession } from "next-auth/react";

function ChatSection() {
  const scrollRef = useRef();
  const { conversations } = useConversations();
  const { data: session, status } = useSession();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: messages } = useSWR(
    conversations ? "/api/message/" + conversations.convoId : null,
    fetcher,
    { revalidateOnFocus: false }
  );
  Pusher.logToConsole = true;
  useEffect(() => {
    if (!session) return;
    if (!conversations) return;
    const pusher = new Pusher("9c6d9a3eec70d40bb809", {
      cluster: "ap2",
      channelAuthorization: {
        endpoint: "/api/auth/pusher",
        params: { data: session.user?.id },
      },
    });

    const channel = pusher.subscribe("presence-" + conversations.convoId);
    channel.bind("pusher:subscription_succeeded", function () {
      console.log("Subscribed");
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    channel.bind("message-rev", (data) => {
      console.log(data);
      mutate("/api/message/" + conversations.convoId, (message) => {
        return [...message, data];
      });
      mutate("/api/message/last_message/" + conversations.convoId, () => {
        return data;
      });
      scrollRef?.current.scrollIntoView({ behavior: "smooth" });
    });
    return () => {
      channel.unbind();
      pusher.disconnect();
      // pusher.unsubscribe('channel_name2')
    };
  }, [conversations]);
  if (!conversations)
    return (
      <div className="flex justify-center items-center text-gray-400 text-xl h-screen w-full">
        No Conversations Selected
      </div>
    );
  if (status === "loading") return <div>Loading...</div>;
  if (!messages) return <div>No Messages</div>;

  return (
    <div className="flex flex-col w-full h-screen bg-chatbackground shadow-lg">
      {/*  header */}
      <TopSection />
      {/* chat area */}
      <div className="h-full w-full flex flex-col overflow-y-auto bg-inherit p-3 scrollbar scrollbar-thumb-secondary scrollbar-thumb-rounded scrollbar-w-2 scrollbar-track-chatbackground">
        {messages?.map((message, index) => {
          const prevMsg = index === 0 ? null : messages[index - 1];
          const nextMsg =
            index === messages.length - 1 ? null : messages[index + 1];

          let prev = 0;
          // if 0 it doesnt come or else pic comes
          if (prevMsg && prevMsg.senderId === message.senderId) prev = 0;
          if (prevMsg && prevMsg.senderId !== message.senderId) prev = 1;
          if (nextMsg && nextMsg.senderId === message.senderId) prev = 0;
          if (nextMsg && nextMsg.senderId !== message.senderId) prev = 1;
          if (index === messages.length - 1) prev = 1;
          if (message.senderId === session.user.id)
            return (
              <div ref={scrollRef}>
                <ChatBubbleSe
                  message={message}
                  key={message._id}
                  prev={prev}
                  image={session.user.image}
                />
              </div>
            );
          else {
            return (
              <div ref={scrollRef}>
                <ChatBubbleRe
                  message={message}
                  key={message._id}
                  prev={prev}
                  image={conversations.image}
                />
              </div>
            );
          }
        })}
      </div>

      {/* input area */}
      <InputBox messages={messages} />
    </div>
  );
}

export default ChatSection;
