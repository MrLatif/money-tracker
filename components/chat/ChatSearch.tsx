const ChatSearch = () => {
  return (
    <div className="chatSearch">
      <div className="searchForm p-[10px]">
        <input
          className="bg-transparent border-none text-white placeholder:text-stone-300 outline-none text-sm"
          type="text"
          placeholder="Find a user"
        />
      </div>
    </div>
  );
};

export default ChatSearch;
