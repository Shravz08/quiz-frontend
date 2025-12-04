import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      toast.error("Please fill all the fields!");
      return;
    }

    setLoading(true);

    try {
      const response = await AuthService.register(form);

      toast.success("Registration Successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer />

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-600 font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 text-white py-3 rounded-xl text-lg font-semibold flex items-center justify-center transition-all ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-indigo-700"
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
