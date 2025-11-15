import React from "react";
import { Link } from "react-router-dom";
import "./WelcomePage.css";

function WelcomePage() {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1 className="welcome-title">Welcome to the Quiz App 🎓</h1>

        <p className="welcome-text">
          Test your knowledge, challenge yourself, and see how well you score!
        </p>

        <Link to="/subjects">
          <button className="start-btn">Start Quiz</button>
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
