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

        {/* COPY BUTTON (ChatGPT style floating but not overlapping text) */}
        <button
          onClick={handleCopy}
          className="
            absolute -right-2 top-1
            opacity-0 group-hover:opacity-100
            sm:opacity-0 sm:group-hover:opacity-100
            bg-zinc-950 hover:bg-zinc-800
            border border-zinc-700
            p-1.5 rounded-md
            transition
            flex items-center justify-center
          "
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>

        {/* MOBILE COPY BUTTON (always visible but small & clean) */}
        <div className="sm:hidden flex justify-end mt-1">
          <button
            onClick={handleCopy}
            className="text-xs text-zinc-400 flex items-center gap-1"
          >
            {copied ? (
              <>
                <Check size={14} /> Copied
              </>
            ) : (
              <>
                <Copy size={14} /> Copy
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;