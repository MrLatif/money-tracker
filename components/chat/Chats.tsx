import { useUser } from "@clerk/nextjs";
import { doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { UserType } from "../../types";

const Chats = () => {
  const { user } = useUser();

  const [chats, setChats] = useState<UserType | null>(null);
  const currentUser = useUser();

  useEffect(() => {
    if(currentUser.user){
      const getChats = () => {
        const unsub = onSnapshot(
            doc(db, "userChats", currentUser.user.id),
            (doc) => {
                setChats(doc.data() as UserType)
            }
        );

        return () => {
          unsub();
        };
      };

      currentUser.user.id && getChats();
    }
    
  }, [currentUser.user]);

  // if(chats){
  //   console.log("Object:")
  //   console.log(Object.entries(chats));
  // }

  return (
      <div className="chats">
          {chats &&
              Object.entries(chats).map((chat: any) => {
                return (
                  <div key={chat[0]} className="userChat">
                      <Image
                          className="rounded-[50%] text-white object-cover"
                          src={chat[1]?.userInfo.photoUrl || "/"}
                          alt=""
                          width={50}
                          height={50}
                      />
                      <div className="userChatInfo">
                          <span className="text-[18px] font-medium">{chat[1]?.userInfo.displayName}</span>
                          <p className="text-[14px] text-stone-300">{chat[1]?.userInfo.lastMessage?.text}</p>
                      </div>
                  </div>
              )})}
      </div>
  );
};

export default Chats;