import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { UserType } from "../../types";
import Image from "next/image";

const ChatSearch = () => {
  const [username, setUsername] = useState(" ");
  const [user, setUser] = useState<UserType | null>(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    setUser(null);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try { 
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          setUser(doc.data() as UserType);
          console.log(doc.data().photoUrl)

      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e: any) => {
    e.code === "Enter" && handleSearch();
  };

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
              <div className="userChat">
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
                      <p className="text-[14px] text-stone-300">Hello</p>
                  </div>
              </div>
          )}
      </div>
  );
};

export default ChatSearch;
