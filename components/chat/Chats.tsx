import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Chats = () => {
  const { user } = useUser();

  return (
    <div className="">
      <div className="userChat">
        <Image
          className="rounded-[50%] text-white object-cover"
          src={user?.imageUrl || "/"}
          alt=""
          width={50}
          height={50}
        />
        <div className="userChatInfo">
          <span className="text-[18px] font-medium">Jane</span>
          <p className="text-[14px] text-stone-300">Hello</p>
        </div>
      </div>
    </div>
  );
};

export default Chats;
