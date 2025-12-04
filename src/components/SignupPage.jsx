import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/AuthService";

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signup(form);

    if (res.error || res.message === "User already exists") {
      setError(res.message || "Signup failed");
      return;
    }

    setSuccessMsg("Account created! Redirecting to Login…");

    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <form className="bg-white p-6 rounded-xl shadow-xl w-80" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 font-semibold text-center">Sign Up</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {successMsg && <p className="text-green-600 text-sm mb-2">{successMsg}</p>}

        <input
          type="text"
          className="w-full p-2 border rounded mb-3"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="email"
          className="w-full p-2 border rounded mb-3"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full p-2 border rounded mb-3"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Sign Up
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
