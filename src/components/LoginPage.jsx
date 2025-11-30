import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/axios";
import "./Login.css";

function LoginPage() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const res = await api.post("/api/auth/login", loginData);

      // Save token in localStorage
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful!");
      window.location.href = "/subjects"; // Redirect to subjects page
    } catch (err) {
      console.error(err);
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="title">Login</h2>
        <p className="subtitle">Welcome back! Please login.</p>

        <form onSubmit={handleLogin}>
          <div className="input-box">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            />
          </div>

          <div className="input-box">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <span onClick={() => (window.location.href = "/signup")}>
            Register
          </span>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}

export default LoginPage;
