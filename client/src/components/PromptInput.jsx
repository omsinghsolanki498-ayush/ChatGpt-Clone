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
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-zinc-950 border border-gray-800 rounded-3xl px-5 py-4 flex items-center gap-4">

        {/* Input */}
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          placeholder="Message ChatGPT..."
          className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400"
        />

        {/* Send Button */}
        <button
          onClick={handleSubmit}
          className="bg-white text-black p-3 rounded-xl hover:bg-gray-300 transition-all"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default PromptInput;