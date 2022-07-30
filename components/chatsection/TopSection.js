import React from "react";
import { useConversations } from "../../context/ConvoProvider";
import { Avatar } from "flowbite-react";
import { HiOutlineSearch } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";

function TopSection() {
  const { conversations, setConversations } = useConversations();
  return (
    <div className="flex w-full h-24 bg-inherit border-b-2 border-secondary items-center justify-between px-10">
      <div className="flex items-center">
        <IoIosArrowBack
          className="h-5 w-5 text-gray-400 mr-4 md:hidden cursor-pointer"
          onClick={() => {
            setConversations((prevConversations) => ({
              ...prevConversations,
              selected: false,
            }));
          }}
        />
        <Avatar
          img={conversations.image}
          rounded={true}
          size="md"
          referrerpolicy="no-referrer"
        >
          <div className="space-y-1 font-medium text-gray-300">
            <div className="text-lg font-sans ">{conversations.name}</div>
          </div>
        </Avatar>
      </div>
      <div>
        <HiOutlineSearch className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}

export default TopSection;
