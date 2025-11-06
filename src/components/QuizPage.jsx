import React, { useState } from "react";
import quizData from "./data/quizData";

function QuizPage({ subject, onFinish }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const questions = quizData[subject];
  const current = questions[index];
  const progress = ((index + 1) / questions.length) * 100;

  const handleAnswer = (i) => {
    const isCorrect = i === current.answer;
    if (isCorrect) setScore((prev) => prev + 1);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      onFinish(score + (isCorrect ? 1 : 0));
    }
  };

  return (
    <div className="page">
      <h3>
        Question {index + 1} of {questions.length}
      </h3>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: progress + "%" }}></div>
      </div>

      <h2>{current.question}</h2>

      {current.options.map((opt, i) => (
        <button key={i} onClick={() => handleAnswer(i)}>
          {opt}
        </button>
      ))}
    </div>
  );
}

export default QuizPage;
