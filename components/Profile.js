import React from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import ReactLoading from "react-loading";

function Profile({ id }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: profile } = useSWR(id && "/api/user/" + id, fetcher);
  const { data: session } = useSession();
  if (!session)
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
  if (!profile) return null;
  return (
    <>
      <h1 className="text-2xl font-sans font-semibold text-gray-200 mb-8">
        My Profile
      </h1>
      <div className="flex flex-col items-center justify-center space-y-5">
        <img
          src={profile.image}
          className="h-28 w-28 rounded-full"
          referrerpolicy="no-referrer"
        />
        <h1 className="text-lg font-sans font-medium text-gray-200">
          {profile.name}
        </h1>
      </div>
      <span className="mt-8 border-t-2 border-secondary h-1 w-full"></span>
    </>
  );
}

export default Profile;
