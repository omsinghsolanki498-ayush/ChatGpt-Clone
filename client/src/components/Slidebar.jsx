import {
  FiPlus,
  FiMessageSquare,
  FiLogOut,
  FiTrash2,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Sidebar({  
  chatHistory,
  handleDelete,
  handleNewChat,
  setMessages,
  selectedChat,
  setSelectedChat,
}) {

  const navigate = useNavigate();

  // RECENT TOGGLE
  const [showRecent, setShowRecent] = useState(false);



  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };



  // OPEN CHAT
  const openChat = (chat) => {

    setSelectedChat(chat._id);

    setMessages([
      {
        role: "user",
        content: chat.prompt,
      },
      {
        role: "assistant",
        content: chat.response,
      },
    ]);
  };



  return (

    <div className="w-[280px] bg-zinc-950 flex flex-col justify-between h-screen border-r border-zinc-800">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="p-4 flex items-center gap-3">

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
            alt="logo"
            className="w-8 h-8 invert"
          />

          <h1 className="text-xl font-semibold text-white">
            ChatGPT
          </h1>

        </div>



        {/* NEW CHAT */}
        <div className="px-3">

          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#2a2a2a] text-white transition-all"
          >

            <FiPlus className="text-lg" />

            <span>New Chat</span>

          </button>

        </div>



        {/* RECENT BUTTON */}
        <div className="mt-6 px-3">

          <button
            onClick={() => setShowRecent(!showRecent)}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#2a2a2a] transition-all text-white"
          >

            <span className="font-medium">
              Recent
            </span>

            {showRecent ? (
              <FiChevronDown />
            ) : (
              <FiChevronRight />
            )}

          </button>

        </div>



        {/* HISTORY */}
        {showRecent && (

          <div className="mt-2 px-3 space-y-2 overflow-y-auto max-h-[65vh]">

            {chatHistory.map((chat) => (

              <div
                key={chat._id}
                className={`group flex items-center justify-between gap-2 p-3 rounded-xl cursor-pointer transition-all ${
                  selectedChat === chat._id
                    ? "bg-[#2a2a2a]"
                    : "hover:bg-[#2a2a2a]"
                }`}
              >

                {/* OPEN CHAT */}
                <div
                  onClick={() => openChat(chat)}
                  className="flex items-center gap-3 flex-1 overflow-hidden"
                >

                  <FiMessageSquare className="text-white min-w-[20px]" />

                  <p className="truncate text-sm text-white">
                    {chat.prompt}
                  </p>

                </div>



                {/* DELETE */}
                <button
                  onClick={() => handleDelete(chat._id)}
                  className="opacity-0 group-hover:opacity-100 transition"
                >

                  <FiTrash2 className="text-red-400 hover:text-red-500" />

                </button>

              </div>
            ))}

          </div>
        )}

      </div>



      {/* BOTTOM */}
      <div className="p-3 border-t border-gray-800">

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#2a2a2a] text-white transition-all"
        >

          <FiLogOut className="text-lg" />

          <span>Logout</span>

        </button>

      </div>

    </div>
  );
}

export default Sidebar;