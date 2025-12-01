import React, { useState } from "react";
import api from "../api/axios";
import { ToastContainer, toast } from "react-toastify";

function SignupPage() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/signup", data);
      toast.success("Signup successful! Please login.");
      window.location.href = "/login";
    } catch (err) {
      toast.error("Signup failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Sign Up</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={data.username}
            onChange={(e) =>
              setData({ ...data, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignupPage;
