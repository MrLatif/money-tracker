import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const ChatSearch = () => {
  const { user } = useUser();

  return (
    <div className="chatSearch">
      <div className="searchForm p-[10px]">
        <input
          className="bg-transparent outline-none text-white border-0 placeholder:text-gray-400"
          type="text"
          placeholder="find a user"
        />
      </div>
      <div className="userChat">
        <Image
          className="rounded-[50%] text-white object-cover"
          src={user?.imageUrl || "/"}
          alt=""
          width={50}
          height={50}
        />
        <div className="userChatInfo">
          <span>Jane</span>
        </div>
      </div>
    </div>
  );
};

export default ChatSearch;
