import React from "react";

function ResultPage({ score, onRestart }) {
  return (
    <div className="page">
      <h2>Your Score: {score}</h2>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
}

export default ResultPage;
