import { ChatNavbar, ChatSearch, Chats } from "..";

const ChatSidebar = () => {
  return (
    <div className="chatSidebar">
      <ChatNavbar />
      <ChatSearch />
      <Chats />
    </div>
  );
};

export default ChatSidebar;
