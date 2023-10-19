import Image from "next/image";
import {
  VideoCameraIcon,
  UserPlusIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Messages from "./Messages";
import { ChatInput } from "..";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo h-[50px] bg-neutral-500 flex items-center justify-between p-[10px] text-stone-300 ">
        <span>Chat</span>
        <div className="chatIcons flex gap-[10px]">
          <VideoCameraIcon className="w-5 max-h-5 cursor-pointer" />
          <UserPlusIcon className="max-h-5 w-5 cursor-pointer" />
          <EllipsisHorizontalIcon className="max-h-5 w-5 cursor-pointer" />
        </div>
      </div>
      <Messages />
      <ChatInput />
    </div>
  );
};

export default Chat;
