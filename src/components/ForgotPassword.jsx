import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = ({ onReset }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    onReset && onReset(email);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2 className="title">Forgot Password?</h2>
        <p className="subtitle">
          Enter your registered email to receive a reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="reset-btn" type="submit">
            Send Reset Link
          </button>
        </form>

        <p className="back-login">
          Remember your password? <span>Back to Login</span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
