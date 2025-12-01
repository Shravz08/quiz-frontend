import React from "react";

function ResultPage() {
  const score = localStorage.getItem("score");

  return (
    <div>
      <h2>Your Score: {score}</h2>
    </div>
  );
}

export default ResultPage;
