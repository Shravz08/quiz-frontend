import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/axios";

function SignupPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // 2️⃣ Signup Handler (Called on button click)
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate
    if (!user.username || !user.email || !user.password) {
      toast.error("All fields are required!");
      return;
    }


    try {
      const res = await api.post("/auth/signup", user);
      console.log("Signup successful:", res.data);

      alert("Account created! Now login.");
      window.location.href = "/login";

    } catch (err) {
      console.error(err);
      alert("Signup failed!");
    }
  };


  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) =>
            setUser({ ...user, password: e.target.value })
          }
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
export default SignupPage;
