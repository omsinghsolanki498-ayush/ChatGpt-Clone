import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

const PromptInput = ({ sendPrompt }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (!prompt.trim()) return;

    sendPrompt(prompt);
    setPrompt("");
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-black">
      
      <div
        className="
          max-w-4xl mx-auto 
          bg-zinc-950 border border-gray-800 
          rounded-2xl md:rounded-3xl 
          px-3 sm:px-4 md:px-5 
          py-3 md:py-4 
          flex items-center gap-2 sm:gap-3 md:gap-4
        "
      >

        {/* INPUT */}
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          placeholder="Message ChatGPT..."
          className="
            flex-1 bg-transparent outline-none 
            text-white placeholder:text-gray-500
            text-sm sm:text-base
          "
        />

        {/* SEND BUTTON */}
        <button
          onClick={handleSubmit}
          className="
            bg-white text-black 
            p-2 sm:p-3 md:p-3 
            rounded-lg md:rounded-xl 
            hover:bg-gray-300 transition-all
            active:scale-95
          "
        >
          <FiSend className="text-sm sm:text-base" />
        </button>

      </div>
    </div>
  );
};

export default PromptInput;