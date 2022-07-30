import FriendReqBubble from "./FriendReqBubble";
import Modal from "./Modal";
import { useSession } from "next-auth/react";
import useSWR from "swr";

export default function FriendReq() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data: session } = useSession();
  const { data: friends } = useSWR(
    session && "/api/friendreq/" + session.user.email,
    fetcher
  );
  console.log(friends);
  if (!session) return <p>loading</p>;
  if (!friends) return <p>error</p>;
  return (
    <>
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-2xl font-sans font-semibold text-gray-200 mb-8 ">
          Friend Requests
        </h1>

        <Modal friends={friends} />
      </div>
      <div className="h-full w-full overflow-y-auto space-y-1">
        {friends.length > 0 ? (
          friends.map((friend) => {
            return (
              <FriendReqBubble
                key={friend._id}
                id={friend._id}
                incomming={session.user.email === friend.senderEmail ? 0 : 1}
                friend={friend}
              />
            );
          })
        ) : (
          <h1 className="text-gray-300 text-center text-md">
            <p>No Requets found</p>
            <p>Start a new one!</p>
          </h1>
        )}
      </div>
    </>
  );
}
