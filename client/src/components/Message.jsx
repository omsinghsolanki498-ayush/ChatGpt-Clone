import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

const Message = ({ role, content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.log("Copy failed:", err);
    }
  };

  const isUser = role === "user";

  return (
    <div
      className={`w-full flex mb-4 px-2 sm:px-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* MESSAGE CONTAINER */}
      <div className="relative group w-fit max-w-[90%] sm:max-w-[75%] md:max-w-2xl">

        {/* MESSAGE BOX */}
        <div
          className={`relative px-4 py-3 rounded-2xl whitespace-pre-wrap text-sm sm:text-base leading-relaxed
          ${isUser ? "bg-zinc-800 text-white" : "bg-zinc-900 text-white"}
          `}
        >
          {content}
        </div>

        {/* COPY BUTTON — floats below the message box, on the right */}
        <div
          className={`
            flex mt-1
            ${isUser ? "justify-end" : "justify-start"}
          `}
        >
          {/* Desktop: visible on hover only */}
          <button
            onClick={handleCopy}
            className="
              hidden sm:flex items-center gap-1
              opacity-0 group-hover:opacity-100
              text-xs text-zinc-400 hover:text-white
              bg-zinc-950 hover:bg-zinc-800
              border border-zinc-700
              px-2 py-1 rounded-md
              transition
            "
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </button>

          {/* Mobile: always visible */}
          <button
            onClick={handleCopy}
            className="sm:hidden flex items-center gap-1 text-xs text-zinc-400"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Message;
