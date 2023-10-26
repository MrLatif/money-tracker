import Image from "next/image";
import { PaperClipIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useChatContext } from "../../context/ChatContext";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import {uploadBytesResumable} from "firebase/storage";
import { db } from "../../lib/firebase";
import { v4 as uuid } from "uuid";

const ChatInput = () => {
  const [text, setText] = useState("");

  const { chatId, user } = useChatContext();
  const currentUser = useUser();

  const handleSend = async () => {
   console.log("handle select function here: ");
    const message = {
        id: uuid,
        text,
        senderId: currentUser.user?.id,
        date: Timestamp.now(),
    };

    try {
       console.log("enters to try catch: ");
        await updateDoc(doc(db, "chats", chatId), {
            messages: arrayUnion(message), // Assuming you have arrayUnion imported
        });
    } catch (error) {
        console.error("Error adding message:", error);
    }

    console.log("It leaves here: ");

    setText("");
  }


  return (
    <div className="chatInput h-[50px] bg-white p-[10px] flex items-center justify-between">
      <input
        className="w-[100%] border-none outline-none text-[18px] placeholder:text-stone-300"
        type="text"
        placeholder="Type something..."
        onChange={e=>setText(e.target.value)}
      />
      <div className="send flex items-center gap-[10px]">
        {/* <PaperClipIcon className="h-5 w-5 cursor-pointer" />
        <input 
          onChange={e=>{
            console.log(e.target.files);
            //setImage(e.target.files[0]);
          }} 
          type="file" 
          style={{ display: "none" }} 
          id="file" 
        />
        <label htmlFor="file">
          <PhotoIcon className="h-5 w-5 cursor-pointer" />
        </label> */}
        <button
          className="rounded-full border-none py-[10px] px-[15px] text-white bg-neutral-700"
          type="submit"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
