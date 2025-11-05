import React from "react";

function WelcomePage({ onStart }) {
  return (
    <div className="page">
      <h1>Welcome to the Quiz App!</h1>
      <p>Test your knowledge and see how well you score.</p>
      <button onClick={onStart}>Start Quiz</button>
    </div>
  );
}

export default WelcomePage;
