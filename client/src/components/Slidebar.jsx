import {
  FiPlus,
  FiMessageSquare,
  FiLogOut,
  FiTrash2,
  FiChevronDown,
  FiChevronRight,
  FiX,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assest/chat.jpg";

function Sidebar({
  chatHistory,
  handleDelete,
  handleNewChat,
  setMessages,
  selectedChat,
  setSelectedChat,
}) {
  const navigate = useNavigate();

  const [showRecent, setShowRecent] = useState(false);
  const [open, setOpen] = useState(false); // mobile drawer

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const openChat = (chat) => {
    setSelectedChat(chat._id);

    setMessages([
      { role: "user", content: chat.prompt },
      { role: "assistant", content: chat.response },
    ]);

    setOpen(false); // close sidebar on mobile
  };

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between bg-zinc-950 text-white px-4 py-3 border-b border-zinc-800">
        <h1 className="font-bold text-lg">PromptFusion</h1>

        <button
          onClick={() => setOpen(true)}
          className="text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:relative z-50 top-0 left-0
          h-full md:h-screen
          w-[280px] bg-zinc-950 border-r border-zinc-800
          flex flex-col justify-between
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* TOP SECTION */}
        <div className="overflow-y-auto">

          {/* HEADER */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                 src={logo}
                alt="logo"
                className="w-8 h-8"
              />

              <h1 className="text-xl font-semibold text-white">
              PromptFusion
              </h1>
            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpen(false)}
              className="md:hidden text-white text-xl"
            >
              <FiX />
            </button>
          </div>

          {/* NEW CHAT */}
          <div className="px-3">
            <button
              onClick={() => {
                handleNewChat();
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#2a2a2a] text-white"
            >
              <FiPlus />
              <span>New Chat</span>
            </button>
          </div>

          {/* RECENT TOGGLE */}
          <div className="mt-6 px-3">
            <button
              onClick={() => setShowRecent(!showRecent)}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#2a2a2a] text-white"
            >
              <span>Recent</span>
              {showRecent ? <FiChevronDown /> : <FiChevronRight />}
            </button>
          </div>

          {/* CHAT HISTORY */}
          {showRecent && (
            <div className="mt-2 px-3 space-y-2 max-h-[55vh] overflow-y-auto">
              {chatHistory.map((chat) => (
                <div
                  key={chat._id}
                  className={`group flex items-center justify-between gap-2 p-3 rounded-xl cursor-pointer transition-all ${selectedChat === chat._id
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
                    className=" opacity-100 md:opacity-0 md:group-hover:opacity-100
                            transition
                             ml-2"
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
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#2a2a2a] text-white"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;