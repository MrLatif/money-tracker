import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

const ChatSearch = () => {
  const [username, setUsername] = useState(" ");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
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
    </div>
  );
};

export default ChatSearch;
