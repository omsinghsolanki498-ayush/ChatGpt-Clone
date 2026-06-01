import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

const Message = ({ role, content }) => {

  const [copied, setCopied] = useState(false);

  const handleCopied = async () => {

    await navigator.clipboard.writeText(content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (

    

    <div
      className={`w-full flex ${
        role === "user"
          ? "justify-end"
          : "justify-start"
      } mb-4`}
    >
      <div className="relative group max-w-3xl">

        {/* Copy Button */}
        <button
          onClick={handleCopied}
          className="absolute mt-13 right-2 opacity-0 group-hover:opacity-100 transition bg-gray-950 hover:bg-gray-900 text-white p-2 rounded-lg"
        >
          {copied ? (
            <Check size={16} />
          ) : (
            <Copy size={16} />
          )}
        </button>

        {/* Message Box */}
        <div
          className={`px-5 py-3 rounded-2xl whitespace-pre-wrap ${
            role === "user"
              ? "bg-zinc-800 text-white"
              : "bg-zinc-800 text-white"
          }`}
        >
          {content}
        </div>

      </div>
    </div>
  );
};

export default Message;

