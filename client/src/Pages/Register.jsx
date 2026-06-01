import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

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
      const res = await axios.post(
        "http://localhost:3002/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      toast.success(res.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0b1120] to-[#111827]">

        {/* TOASTER */}
        <Toaster position="top-right" />

        {/* NAVBAR */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
              alt="logo"
              className="w-10 h-10"
            />

            <h1 className="text-white text-2xl font-bold tracking-wide">
              CHATGPT
            </h1>
          </div>

          <Link
            to="/login"
            className="text-gray-300 hover:text-white transition"
          >
            Login
          </Link>
        </div>

        {/* REGISTER CARD */}
        <div className="flex-1 flex items-center justify-center px-4 py-10">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-[#111827]/90 backdrop-blur-lg border border-gray-700 rounded-3xl p-10 shadow-2xl shadow-blue-900/30"
          >
            {/* LOGO */}
            <div className="flex justify-center mb-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
                alt="logo"
                className="w-16 h-16"
              />
            </div>

            {/* HEADING */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-3">
                Create Account
              </h1>

              <p className="text-gray-400 text-sm">
                Join your AI assistant platform today
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
                className="w-full p-4 rounded-xl bg-[#1f2937] border border-gray-700 text-white outline-none focus:border-blue-500 transition"
              />

              <input
                type="email"
                placeholder="Email Address"
                name="email"
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-[#1f2937] border border-gray-700 text-white outline-none focus:border-blue-500 transition"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-[#1f2937] border border-gray-700 text-white outline-none focus:border-blue-500 transition"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-[#1f2937] border border-gray-700 text-white outline-none focus:border-blue-500 transition"
              />

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white font-semibold py-4 rounded-xl text-lg cursor-pointer shadow-lg hover:scale-[1.02]"
              >
                Create Account
              </button>
            </div>

            {/* LOGIN */}
            <p className="text-center text-gray-400 mt-7">
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
        <footer className="border-t border-black hover:bg-white hover:text-black py-5 text-center text-gray-500 text-sm">
          © 2026 ChatGPT •
        </footer>
      </div>
    </>
  );
}

export default Register;