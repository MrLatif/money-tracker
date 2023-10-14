"use client";

import { Chat, ChatSidebar } from "../../components";

const page = () => {
  return (
    <div className="chatHome">
      <div className="chatContainer">
        <ChatSidebar />
        <Chat />
      </div>
    </div>
  );
};

export default page;
