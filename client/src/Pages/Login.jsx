import { useState } from "react";
import axios from "axios";
import { Link , useNavigate} from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

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

      const res = await axios.post(
        "http://localhost:3002/api/auth/login",
        formData
      );

      // Save TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );
       
      toast.success(res.data.message);

      navigate("/dashboard");

    } catch (error) {

      toast.error(error.response.data.message);
    }
  };



  return (
    <>
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center px-4">

      <Toaster position="top-right" />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#111827] border border-gray-800 rounded-3xl p-10 shadow-2xl"
      >

        <div className="flex justify-center mb-6">
           <h1 className="text-gray-300 shadow-sm shadow-blue-600 hover:shadow-red-600 text-xl  font-serif px-4 py-2 rounded-lg">
             CHATGPT
           </h1>
        </div>

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome Back
          </h1>

          <p className="text-gray-400">
            Login to continue
          </p>

        </div>

        <div className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-transparent border border-gray-700 text-white outline-none focus:border-blue-500 "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-transparent border border-gray-700 text-white outline-none focus:border-blue-500 "
          />

          <button
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-semibold text-lg"
          >
            Login
          </button>

        </div>

          <p className="text-center text-gray-400 mt-7">
              Don't have an account?
              <Link
                to="/"
                className="text-blue-400 ml-2 hover:underline"
              >
                Sign Up
              </Link>
            </p>

      </form>
    </div>
      {/* FOOTER */}
        <footer className="border-t border-black bg-zinc-800 hover:bg-white hover:text-black py-5 text-center text-gray-500 text-sm">
          © 2026 ChatGPT Clone •
        </footer>
        </>
  );
}

export default Login;