import Image from "next/image";
import { PaperClipIcon, PhotoIcon } from "@heroicons/react/24/outline";

const ChatInput = () => {
  return (
    <div className="chatInput h-[50px] bg-white p-[10px] flex items-center justify-between">
      <input
        className="w-[100%] border-none outline-none text-[18px] placeholder:text-stone-300"
        type="text"
        placeholder="Type something..."
      />
      <div className="send flex items-center gap-[10px]">
        <PaperClipIcon className="h-5 w-5 cursor-pointer" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <PhotoIcon className="h-5 w-5 cursor-pointer" />
        </label>
        <button
          className="rounded-full border-none py-[10px] px-[15px] text-white bg-neutral-700"
          type="submit"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
