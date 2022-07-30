import React from "react";
import { useSession, signOut } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineChat } from "react-icons/md";
import { TbUserPlus } from "react-icons/tb";
import { Dropdown, Tooltip, Avatar } from "flowbite-react";

export default function NavBar({ selectednav, setSelectednav }) {
  const { data: session, status } = useSession();
  if (status === "loading")
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
  if (!session) return null;
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
      <Tooltip content="Conversations">
        <button
          type="button"
          onClick={() => setSelectednav("conversations")}
          className={`
            ${
              selectednav !== "conversations"
                ? "p-3"
                : "bg-[#3F4A57] rounded-xl p-3"
            } transition-all duration-300 ease-in-out
          `}
        >
          <MdOutlineChat
            className={`
              ${
                selectednav !== "conversations"
                  ? "text-gray-400 h-7 w-7"
                  : "text-lightblue h-7 w-7"
              } transition-all duration-300 ease-in-out
            `}
          />
        </button>
      </Tooltip>

      <Tooltip content="Friend Reqests">
        <button
          type="button"
          onClick={() => setSelectednav("friendreq")}
          className={`
        ${
          selectednav !== "friendreq" ? "p-3" : "bg-[#3F4A57] rounded-xl p-3"
        } transition-all duration-300 ease-in-out
        `}
        >
          <TbUserPlus
            className={
              selectednav !== "friendreq"
                ? "text-gray-400 h-7 w-7"
                : "text-lightblue h-7 w-7"
            }
          />
        </button>
      </Tooltip>
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
            referrerpolicy="no-referrer"
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
