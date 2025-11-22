import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/axios";
import "./Signup.css";

function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // 2️⃣ Signup Handler (Called on button click)
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate
    if (!form.username || !form.email || !form.password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res = await api.post("/auth/signup", form);

      toast.success("Signup successful! Please login.");
      setTimeout(() => (window.location.href = "/login"), 1500);
    } catch (err) {
      toast.error("Signup failed. Try again.");
    }
  };

 return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>

        <form onSubmit={handleSignup}>
          <div className="input-box">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div className="input-box">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="input-box">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button className="signup-btn" type="submit">
            Sign Up
          </button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <span onClick={() => (window.location.href = "/login")}>Login</span>
        </p>

      </div>

      <ToastContainer />
    </div>
  );
}

export default SignupPage;