import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import ConversationBubble from "./ConversationBubble";

export default function Conversations() {
  const [people, setPeople] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [name, setName] = useState("");
  const { data: session, status } = useSession();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: convos } = useSWR(
    status !== "loading" ? "/api/conversation/" + session?.user.id : null,
    fetcher
  );

  useEffect(() => {
    if (convos && status !== "loading") {
      convos.forEach(async (convo) => {
        const friendId = convo.members.filter((member) => {
          return member != session.user.id;
        });
        const respone = await fetch(`/api/user/${friendId[0]}`);
        const userInfo = await respone.json();
        if (userInfo) {
          setPeople((prevPeople) => [
            ...prevPeople,
            {
              id: userInfo._id,
              image: userInfo.image,
              name: userInfo.name,
              email: userInfo.email,
              convoId: convo._id,
            },
          ]);
          setFoundItems((prevFoundItems) => [
            ...prevFoundItems,
            {
              id: userInfo._id,
              image: userInfo.image,
              name: userInfo.name,
              email: userInfo.email,
              convoId: convo._id,
            },
          ]);
        }
      });
    }
  }, [convos]);

  useEffect(() => {
    const filterPeople = (name) => {
      const filteredPeople = people.filter((person) => {
        return person.name.toLowerCase().includes(name.toLowerCase());
      });
      setFoundItems(filteredPeople);
    };
    filterPeople(name);
  }, [name]);

  if (!convos && !foundItems && session)
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
  return (
    <>
      <h1 className="text-2xl font-sans font-semibold text-gray-200">Chats</h1>
      <div className="flex h-12 w-full bg-secondary rounded-lg px-5 py-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 mr-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="search"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-inherit focus:outline-none w-full text-gray-300 outline-none border-none"
          placeholder="Search for a friend"
        />
      </div>
      <h1 className="text-lg font-sans font-semibold text-gray-200">Recent</h1>
      <div className="h-full w-full overflow-y-auto space-y-1">
        {status !== "loading" && foundItems && foundItems.length > 0 ? (
          foundItems.map((person) => (
            <ConversationBubble key={person.id} person={person} />
          ))
        ) : (
          <h1 className="text-gray-300 text-center text-lg">
            No Friends found
          </h1>
        )}

        <div className=" h-[74px] md:hidden"></div>
      </div>
    </>
  );
}
