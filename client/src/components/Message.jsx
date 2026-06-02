import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

const Message = ({ role, content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopied = async () => {
    await navigator.clipboard.writeText(content);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`
        w-full flex mb-4 px-2 sm:px-0
        ${role === "user" ? "justify-end" : "justify-start"}
      `}
    >
      {/* MESSAGE WRAPPER */}
      <div
        className="
          relative group 
          max-w-[85%] sm:max-w-[75%] md:max-w-3xl
        "
      >
        
        {/* COPY BUTTON */}
        <button
          onClick={handleCopied}
          className="
            absolute top-2 right-2
            opacity-0 group-hover:opacity-100
            transition
            bg-gray-950 hover:bg-gray-800
            text-white p-1.5 sm:p-2
            rounded-lg
          "
        >
          {copied ? (
            <Check size={16} />
          ) : (
            <Copy size={16} />
          )}
        </button>

        {/* MESSAGE BOX */}
        <div
          className={`
            px-3 sm:px-5 py-2 sm:py-3 
            rounded-2xl 
            whitespace-pre-wrap 
            text-sm sm:text-base
            leading-relaxed
            ${
              role === "user"
                ? "bg-zinc-800 text-white"
                : "bg-zinc-800 text-white"
            }
          `}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default Message;