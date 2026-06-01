// Dashboard.jsx

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Slidebar";
import Navbar from "../components/Navbar";
import Message from "../components/Message";
import PromptInput from "../components/PromptInput";

const Dashboard = () => {

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [chatHistory, setChatHistory] = useState([]);

  const [selectedChat, setSelectedChat] = useState(null);

  const navigate = useNavigate();

  const messagesEndRef = useRef(null);



  // AUTO SCROLL
  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);



  // AUTH CHECK
  const fetchDashboard = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      await axios.get(
        "http://localhost:3002/api/auth/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    } catch (error) {

      localStorage.removeItem("token");

      toast.error("Unauthorized");

      navigate("/login");
    }
  };



  // FETCH CHATS
  const fetchChats = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3002/api/chat/getchats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChatHistory(res.data.chats);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load chats");
    }
  };



  useEffect(() => {

    fetchDashboard();

    fetchChats();

  }, []);




  // SEND PROMPT
  const sendPrompt = async (prompt) => {

    if (!prompt.trim()) return;



    // USER MESSAGE
    const userMessage = {
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);



    try {

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3002/api/chat/send",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );



      // AI MESSAGE
      const aiMessage = {
        role: "assistant",
        content: res.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);



      // REFRESH HISTORY
      fetchChats();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };




  // DELETE CHAT
  const handleDelete = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3002/api/chat/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchChats();

      toast.success("Chat Deleted");

    } catch (error) {

      toast.error("Delete Failed");
    }
  };




  // NEW CHAT
  const handleNewChat = () => {

    setMessages([]);

    setSelectedChat(null);
  };




  return (

    <div className="flex h-screen bg-black text-white overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar
        chatHistory={chatHistory}
        handleDelete={handleDelete}
        handleNewChat={handleNewChat}
        setMessages={setMessages}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />



      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <Navbar />



        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">

          {/* EMPTY SCREEN */}
          {messages.length === 0 && (

            <div className="h-full flex flex-col items-center justify-center">

              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
                alt="logo"
                className="w-20 h-20 invert mb-6"
              />

              <h1 className="text-3xl font-semibold mb-3">
                What can I help with?
              </h1>

            </div>
          )}



          {/* MESSAGES */}
          {messages.map((message, index) => (

            <Message
              key={index}
              role={message.role}
              content={message.content}
            />

          ))}



          {/* LOADING */}
          {loading && (

            <div className="flex justify-start">

              <div className="bg-[#2a2a2a] px-5 py-3 rounded-2xl">

                <div className="flex gap-2">

                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>

                  <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>

                  <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>

                </div>

              </div>

            </div>
          )}

          <div ref={messagesEndRef}></div>

        </div>



        {/* INPUT */}
        <PromptInput sendPrompt={sendPrompt} />

      </div>

    </div>
  );
};

export default Dashboard;