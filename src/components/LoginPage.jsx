import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all the fields!");
      return;
    }

    setLoading(true);

    try {
      const response = await AuthService.login(email, password);

      if (response.token) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: response.token,
            role: response.role,
            username: response.username,
          })
        );

        toast.success("Login Successful!");

        setTimeout(() => {
          if (response.role === "ADMIN") navigate("/adminDashboard");
          else navigate("/userDashboard");
        }, 800);
      } else {
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer />

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-600 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-xl mt-1 focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-xl mt-1 focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 text-white py-3 rounded-xl text-lg font-semibold flex items-center justify-center transition-all duration-300 ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-indigo-700"
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
