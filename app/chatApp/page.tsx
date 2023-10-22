"use client";

import { useState } from "react";
import { Chat, ChatSidebar } from "../../components";
import { UserType } from "../../types";

const page = () => {

  // const [dataFromChild, setDataFromChild] = useState<UserType | null>(null);

  // const handleChildData = (data: UserType) => {
  //   setDataFromChild(data);
  // }

  return (
    <div className="chatHome">
      <div className="chatContainer">
        <ChatSidebar/>
        <Chat />
      </div>
    </div>
  );
};

export default page;