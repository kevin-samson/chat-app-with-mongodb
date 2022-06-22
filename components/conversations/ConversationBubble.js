import React from "react";
import useSWR from "swr";
import { useConversations } from "../../context/ConvoProvider";

function ConversationBubble({ person }) {
  const { conversations, setConversations } = useConversations();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: last_message } = useSWR(
    person.convoId ? "/api/message/last_message/" + person.convoId : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  return (
    <button
      type="button"
      className={` h-[5rem] rounded-sm flex flex-row items-center p-4 hover:bg-secondary transition duration-150 ease-in-out w-full ${
        conversations?.convoId === person.convoId ? "bg-secondary" : null
      }`}
      key={person.id}
      onClick={() => {
        setConversations({ ...person, selected: true });
      }}
    >
      <img src={person.image} className="h-11 w-11 rounded-full mr-5" />
      <div className="block truncate text-left w-full">
        <div className="flex flex-row items-center justify-between space-x-2">
          <strong className="text-gray-200 font-semibold">{person.name}</strong>
          <div className="truncate text-gray-400  text-xs">
            {new Date(last_message?.created_at).toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </div>
        </div>
        <div className="truncate text-gray-400 text-sm">
          {last_message?.message}
        </div>
      </div>
    </button>
  );
}

export default ConversationBubble;
