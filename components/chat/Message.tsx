import { UserCircleIcon } from "@heroicons/react/24/outline";

const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <UserCircleIcon className="h-10 w-10 rounded-[50%] object-fit" />
        <span>just now</span>
      </div>

      <div className="messageContent ">
        <p>hello</p>
      </div>
    </div>
  );
};

export default Message;
