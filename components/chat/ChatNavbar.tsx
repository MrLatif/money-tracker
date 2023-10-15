import Image from "next/image";
import { useUser } from "@clerk/nextjs";

const ChatNavbar = () => {
  const { user } = useUser();

  return (
    <div className="chatNavbar">
      <Image
        className="rounded-[50%] object-cover"
        src={user?.imageUrl || "/"}
        alt="Profile Picture"
        width={24}
        height={24}
      />
      <div className="chatNavbarUser">
        <span>{user?.firstName}</span>
      </div>
      <button className="chatCloseButton">Logout</button>
    </div>
  );
};

export default ChatNavbar;
