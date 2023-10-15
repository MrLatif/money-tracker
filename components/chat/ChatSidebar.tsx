import { ChatNavbar, ChatSearch, Chats } from "..";

const ChatSidebar = () => {
  return (
    <div className="chatSidebar">
      <ChatNavbar />
      <ChatSearch />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
    </div>
  );
};

export default ChatSidebar;
