import React from "react";
import { useSession, signOut } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineChat } from "react-icons/md";
import { Dropdown, Tooltip, Avatar } from "flowbite-react";

export default function NavBar({ selectednav, setSelectednav }) {
  const { data: session, status } = useSession();
  if (status === "loading") return <p>loading</p>;
  if (!session) return <p>no session</p>;
  return (
    <div className="fixed md:relative flex md:flex-col md:w-24 md:h-full bottom-0 w-full h-16 bg-secondary items-center justify-around md:shadow-lg">
      <Tooltip content="Profile">
        <button
          type="button"
          onClick={() => setSelectednav("profile")}
          className={`
          ${
            selectednav !== "profile" ? "p-3" : "bg-[#3F4A57] rounded-xl p-3"
          } transition-all duration-300 ease-in-out`}
        >
          <CgProfile
            className={`${
              selectednav !== "profile"
                ? "text-gray-400 h-7 w-7"
                : "text-lightblue h-7 w-7"
            } transition-all duration-300 ease-in-out`}
          />
        </button>
      </Tooltip>
      <div
        onClick={() => setSelectednav("conversations")}
        className={
          selectednav !== "conversations"
            ? "p-3"
            : "bg-[#3F4A57] rounded-xl p-3"
        }
      >
        <MdOutlineChat
          className={
            selectednav !== "conversations"
              ? "text-gray-400 h-7 w-7"
              : "text-lightblue h-7 w-7"
          }
        />
      </div>
      {/* <img
        src={session?.user.image}
        alt="ugugu"
        className="h-8 w-8 rounded-full"
      /> */}
      <Dropdown
        style="dark"
        label={
          <Avatar
            alt="User settings"
            img={session?.user.image}
            rounded={true}
          />
        }
        arrowIcon={false}
        inline={true}
      >
        <Dropdown.Header>
          <span className="block text-sm">{session.user.name}</span>
          <span className="block truncate text-sm font-medium">
            {session.user.email}
          </span>
        </Dropdown.Header>

        <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
      </Dropdown>
    </div>
  );
}
