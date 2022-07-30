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
    const res = await fetch("api/message", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const result = await res.json();
    fetch("api/pusher", {
      method: "POST",
      body: JSON.stringify({
        ...body,
        _id: result.insertedId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return [...messages, body];
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
      created_at: new Date(),
    };
    updateMsg(body);
    setMessage("");
  };
  if (status === "loading") return <div>Loading...</div>;
  return (
    <form onSubmit={handleSubmit} autocomplete="off">
      <div className="flex flex-row bottom-0 w-full h-20 bg-inherit border-t-2 border-secondary items-center justify-between p-8 md:w-full">
        <input type="text" className="hidden" />
        <input type="text" className="hidden" />
        <input type="text" className="hidden" />
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="bg-secondary w-full mr-8 rounded-lg text-gray-300 border-none focus:ring-0"
          placeholder="Enter the text"
          autofocus
          autocomplete="chrome-off"
        />
        <input type="submit" className="hidden" />
        <BsEmojiLaughing className="h-5 w-5 text-gray-400" />
      </div>
    </form>
  );
}

export default InputBox;
