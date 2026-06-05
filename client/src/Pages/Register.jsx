import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import logo from "../assest/chat.jpg";

const API = import.meta.env.VITE_API_URL;

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post(`${API}/api/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0b1120] to-[#111827]">
      
      {/* TOASTER */}
      <Toaster position="top-right"/>

      {/* NAVBAR */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img
            // src="https://www.magnific.com/free-vector/happy-floating-ai-robot_136880955.htm#fromView=keyword&page=2&position=27&uuid=f2931c20-7658-42cb-947e-0821926b6e52&query=Ai+chatbot+logo"
            src={logo}
            alt="logo"
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
          <h1 className="text-white text-lg sm:text-2xl font-bold">
            ChatFusion
          </h1>
        </div>

        <Link
          to="/login"
          className="text-gray-300 hover:text-white transition text-sm sm:text-base"
        >
          Login
        </Link>
      </div>

      {/* FORM WRAPPER */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-10">
        
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-[#111827]/90 backdrop-blur-lg 
          border border-gray-700 rounded-2xl sm:rounded-3xl 
          p-6 sm:p-10 shadow-2xl shadow-blue-900/30"
        >
          
          {/* LOGO */}
          <div className="flex justify-center mb-5">
            <img
              src={logo}
              alt="logo"
              className="w-14 h-14 sm:w-16 sm:h-16"
            />
          </div>

          {/* HEADING */}
          <div className="text-center mb-7 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-400 text-sm">
              Join your AI assistant platform
            </p>
          </div>

          {/* INPUTS */}
          <div className="space-y-4">
            
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              onChange={handleChange}
              required
              className="w-full p-3 sm:p-4 rounded-xl bg-[#1f2937] 
              border border-gray-700 text-white outline-none 
              focus:border-blue-500 text-sm sm:text-base"
            />

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
              required
              className="w-full p-3 sm:p-4 rounded-xl bg-[#1f2937] 
              border border-gray-700 text-white outline-none 
              focus:border-blue-500 text-sm sm:text-base"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
              className="w-full p-3 sm:p-4 rounded-xl bg-[#1f2937] 
              border border-gray-700 text-white outline-none 
              focus:border-blue-500 text-sm sm:text-base"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              required
              className="w-full p-3 sm:p-4 rounded-xl bg-[#1f2937] 
              border border-gray-700 text-white outline-none 
              focus:border-blue-500 text-sm sm:text-base"
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 
              transition-all duration-300 text-white font-semibold 
              py-3 sm:py-4 rounded-xl text-base sm:text-lg 
              shadow-lg hover:scale-[1.02]"
            >
              Create Account
            </button>
          </div>

          {/* LOGIN LINK */}
          <p className="text-center text-gray-400 mt-6 sm:mt-7 text-sm">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-400 ml-2 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-4 text-center text-gray-500 text-xs sm:text-sm">
        © 2026 ChatFusion
      </footer>
    </div>
  );
}

export default Register;

