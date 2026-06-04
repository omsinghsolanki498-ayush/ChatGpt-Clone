import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";


const API = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/auth/login`, formData);

      localStorage.setItem("token", res.data.token);

      toast.success(res.data.message);

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] flex flex-col">
      
      <Toaster position="top-right" />

      {/* TOP HEADER */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-800">
        <h1 className="text-white text-lg sm:text-2xl font-bold">
          ChatFusion
        </h1>

        <Link
          to="/"
          className="text-gray-300 hover:text-white text-sm sm:text-base"
        >
          Register
        </Link>
      </div>

      {/* CENTER FORM */}
      <div className="flex-1 flex items-center justify-center px-4">
        
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-[#111827] border border-gray-800 
          rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl"
        >
          
          <h1 className="text-2xl sm:text-4xl font-bold text-white text-center mb-2">
            Welcome Back
          </h1>

          <p className="text-gray-400 text-center mb-8 text-sm">
            Login to continue
          </p>

          <div className="space-y-4">
            
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              onChange={handleChange}
              className="w-full p-3 sm:p-4 rounded-xl bg-transparent border border-gray-700 
              text-white outline-none focus:border-blue-500 text-sm sm:text-base"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full p-3 sm:p-4 rounded-xl bg-transparent border border-gray-700 
              text-white outline-none focus:border-blue-500 text-sm sm:text-base"
            />

            <button
              type="submit"
              className="w-full  bg-emerald-500 hover:bg-emerald-600 
              text-white py-3 sm:py-4 rounded-xl font-semibold 
              text-base sm:text-lg hover:scale-[1.02]"
            >
              Login
            </button>
          </div>

          <p className="text-center text-gray-400 mt-6 text-sm">
            Don't have an account?
            <Link to="/" className="text-blue-400 ml-2 hover:underline">
              Sign Up
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

export default Login;