import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupPage() {

  // 1️⃣ State Variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2️⃣ Signup Handler (Called on button click)
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate
    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        toast.success("Signup Successful! You can now login.");
        // later we will redirect to login page
      } else {
        toast.error("User already exists or invalid data!");
      }
    } catch (error) {
      toast.error("Backend connection error!");
    }
  };

  return (
    <div className="signup-page">
      <h2>Create Account</h2>

      {/* 3️⃣ FORM */}
      <form onSubmit={handleSignup}>

        <input
          type="text"
          placeholder="Enter Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button type="submit">Sign Up</button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default SignupPage;
