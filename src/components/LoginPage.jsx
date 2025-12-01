import React, { useState } from "react";
import api from "../api/axios";
import { ToastContainer, toast } from "react-toastify";

function LoginPage() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", data);

      localStorage.setItem("token", res.data.token); // Save token

      toast.success("Login successful!");
      window.location.href = "/subjects";
    } catch (err) {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={data.username}
            placeholder="Username"
            onChange={(e) =>
              setData({ ...data, username: e.target.value })
            }
          />
          <input
            type="password"
            value={data.password}
            placeholder="Password"
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />

          <button type="submit">Login</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
