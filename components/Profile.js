import React from "react";
import { useSession } from "next-auth/react";
function Profile() {
  const { data: session } = useSession();
  if (!session) return <p>loading</p>;
  return (
    <>
      <h1 className="text-2xl font-sans font-semibold text-gray-200 mb-8">
        My Profile
      </h1>
      <div className="flex flex-col items-center justify-center space-y-5">
        <img src={session.user.image} className="h-28 w-28 rounded-full" />
        <h1 className="text-lg font-sans font-medium text-gray-200">
          {session.user.name}
        </h1>
      </div>
    </>
  );
}

export default Profile;
