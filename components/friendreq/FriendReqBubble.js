import { Tooltip } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import React from "react";
import { mutate } from "swr";
import { useSession } from "next-auth/react";

export default function FriendReqBubble({ incomming, friend, id }) {
  const { data: session } = useSession();

  const handleAcc = (e) => {
    e.preventDefault();
    fetch("api/conversation", {
      method: "POST",
      body: JSON.stringify({
        senderId: session?.user.id,
        receiverId: friend.senderId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    fetch("api/friendreq/", {
      method: "DELETE",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    mutate(
      session && "/api/friendreq/" + session.user.email,
      (reqs) => {
        return reqs.filter((req) => req._id !== id);
      },
      false
    );
  };
  const handleReg = (e) => {
    e.preventDefault();
    fetch("api/friendreq/", {
      method: "DELETE",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    mutate(
      session && "/api/friendreq/" + session.user.email,
      (reqs) => {
        return reqs.filter((req) => req._id !== id);
      },
      false
    );
  };

  return (
    <div
      className={` h-[5rem] rounded-md flex flex-row items-center p-3 hover:bg-secondary transition duration-150 ease-in-out w-full space-x-2`}
    >
      <FaRegUserCircle className="h-11 w-11 rounded-full text-lightblue bg-black " />
      <div className="block truncate text-left w-auto">
        <strong className="text-gray-200 font-medium">
          {!incomming ? friend.resEmail : friend.senderEmail}
        </strong>

        <div className="truncate text-gray-400 text-sm w-auto">
          {incomming ? "Incomming Friend Request" : "Outgoing Friend Request"}
        </div>
      </div>

      <Tooltip content="Accept">
        <div
          onClick={handleAcc}
          className={`${
            incomming ? "flex" : "hidden"
          } h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-800 text-green-200`}
        >
          <HiCheck className="h-5 w-5" />
        </div>
      </Tooltip>
      <Tooltip content="Decline">
        <div
          onClick={handleReg}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-800 text-red-200"
        >
          <HiX className="h-5 w-5" />
        </div>
      </Tooltip>
    </div>
  );
}
