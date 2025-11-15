import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuizById } from "../services/QuizService";
import "./QuizPage.css";

const QuizPage = () => {
  const { id } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      const data = await getQuizById(id);
      setQuiz(data);
    };
    loadQuiz();
  }, [id]);

  if (!quiz) return <p className="loading-text">Loading Quiz...</p>;

  const question = quiz.questions[current];

  const handleSelect = (index) => {
    setSelected(index);
  };

  const handleNext = () => {
    if (selected === null) return alert("Please select an option!");

    if (selected === question.answer) {
      setScore((prev) => prev + 1);
    }

    setSelected(null);

    if (current + 1 < quiz.questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="result-screen">
        <h1>Quiz Finished 🎉</h1>
        <p>
          Your Score: <span>{score}</span> / {quiz.questions.length}
        </p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Retry Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="quizpage-container">
      <div className="quiz-card">

        {/* Progress */}
        <div className="progress-text">
          Question {current + 1} / {quiz.questions.length}
        </div>

        {/* Progress bar */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((current + 1) / quiz.questions.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* Question */}
        <h2 className="question-text">{question.text}</h2>

        {/* Options */}
        <div className="options-container">
          {question.options.map((opt, idx) => (
            <div
              key={idx}
              className={`option-box ${selected === idx ? "selected" : ""}`}
              onClick={() => handleSelect(idx)}
            >
              {opt}
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button className="next-btn" onClick={handleNext}>
          {current + 1 === quiz.questions.length ? "Finish Quiz" : "Next ➜"}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
