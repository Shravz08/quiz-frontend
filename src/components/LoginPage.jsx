import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {

  // 1️⃣ STATE FOR EMAIL & PASSWORD
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2️⃣ LOGIN FUNCTION (CALLED ON BUTTON CLICK)
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast.success("Login Successful!");
        // redirect later or store token
      } else {
        toast.error("Invalid Email or Password!");
      }
    } catch (error) {
      toast.error("Backend not connected!");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

      {/* 3️⃣ FORM SUBMIT HANDLES LOGIN */}
      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default LoginPage;
