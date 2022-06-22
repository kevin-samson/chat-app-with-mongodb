import { BsEmojiLaughing } from "react-icons/bs";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useConversations } from "../../context/ConvoProvider";
import { useSWRConfig } from "swr";

function InputBox({ messages }) {
  const { mutate } = useSWRConfig();
  const { conversations } = useConversations();
  const { data: session, status } = useSession();
  const [message, setMessage] = useState("");

  const updateMsg = async (body) => {
    fetch("api/message", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const allMsg = await fetch(`api/message/${conversations.convoId}`);
    const allMsgJson = await allMsg.json();
    return allMsgJson;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    if (!session) return;
    if (!conversations) return;
    const body = {
      senderId: session.user.id,
      conversationId: conversations.convoId,
      message: message,
    };

    let optimdata = [...messages, body];
    const options = { optimisticData: optimdata, rollbackOnError: true };

    console.log(message);
    const newMsg = await mutate(
      "/api/message/" + conversations.convoId,
      updateMsg(body),
      options
    );

    mutate("/api/message/last_message/" + conversations.convoId, () => {
      newMsg[newMsg.length - 1];
    });
    setMessage("");
  };
  if (status === "loading") return <div>Loading...</div>;
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row bottom-0 w-full h-20 bg-inherit border-t-2 border-secondary items-center justify-between p-8 md:w-full">
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="bg-secondary w-full mr-8 rounded-lg text-gray-300 border-none focus:ring-0"
          placeholder="Enter the text"
        />
        <input type="submit" className="hidden" />
        <BsEmojiLaughing className="h-5 w-5 text-gray-400" />
      </div>
    </form>
  );
}

export default InputBox;
