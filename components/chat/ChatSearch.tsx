import { useState } from "react";
import { setDoc, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { UserType } from "../../types";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

const ChatSearch = () => {
  const [username, setUsername] = useState(" ");
  const [user, setUser] = useState<UserType | null>(null);
  const [err, setErr] = useState(false);

  const currentUser = useUser();

  const handleSearch = async () => {
    
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try { 
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((userDoc) => {
          // console.log(doc.id, " => ", doc.data());
          setUser(userDoc.data() as UserType);

      });
    } catch (err) {
      setErr(true);
    }

    //if(!user) setUser(null);
  };

  const handleKey = (e: any) => {
    e.code === "Enter" && handleSearch();
  };
  
  const handleSelect = async () => {
    //checking whether the chat already exists, if not create
    if(currentUser.user && user){
      const combinedId = 
        currentUser.user.id > user.uid 
        ? currentUser.user.id + user.uid 
        : user.uid + currentUser.user.id; 

      try{

        const docRef = doc(db, "chats", combinedId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          const chatRef = collection(db, "chats");
          await setDoc(doc(chatRef, combinedId), { messages:[] });

          //create user chats
          userChats: {
            
          }
        }

      }catch(err){

      }
      
    }
    

    //create user chats
  }

  return (
      <div className="chatSearch">
          <div className="searchForm p-[10px]">
              <input
                  onKeyDown={handleKey}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent border-none text-white placeholder:text-stone-300 outline-none text-sm"
                  type="text"
                  placeholder="Find a user"
              />
          </div>
          {!user && <span>User not found</span>}
          {user && (
              <div className="userChat" onClick={handleSelect}>
                  <Image
                      className="rounded-[50%] text-white object-cover"
                      src={user.photoUrl}
                      alt=""
                      width={50}
                      height={50}
                  />
                  <div className="userChatInfo">
                      <span className="text-[18px] font-medium">
                          {user.displayName}
                      </span>
                  </div>
              </div>
          )}
      </div>
  );
};

export default ChatSearch;
