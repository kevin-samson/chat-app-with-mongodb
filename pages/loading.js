import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
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
}
