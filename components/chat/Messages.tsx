import React, { useEffect, useState } from "react";
import { Message } from "..";
import { useChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useUser } from "@clerk/nextjs";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { chatId, user } = useChatContext();
  const currentUser = useUser();

  useEffect(() => {
    if(chatId){
      const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
          doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
          unSub();
      };
    }
    
  }, [chatId])

  console.log("Message: ")
  console.log(messages);

  return (
      <div className="messages overflow-scroll bg-stone-300 p-[10px] h-[calc(100%-100px)]">
        {messages.map((m) => (
          <Message message={m}/>
        ))}
      </div>
  );
};

export default Messages;
