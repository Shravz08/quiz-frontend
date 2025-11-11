import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Fetch questions dynamically from backend
  useEffect(() => {
    fetch("http://localhost:8082/api/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return alert("Please select an answer!");

    const currentQuestion = questions[currentIndex];
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
    }

    setSelectedOption(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentIndex(0);
    setShowScore(false);
    setSelectedOption(null);
  };

  if (questions.length === 0) {
    return <p className="loading">Loading questions...</p>;
  }

  if (showScore) {
    return (
      <div className="app-container">
        <h1 className="title">Quiz Completed 🎉</h1>
        <p className="score-text">
          You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>
        </p>
        <button className="next-btn" onClick={restartQuiz}>
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="app-container">
      <h1 className="title">Java Quiz App</h1>
      <div className="question-card">
        <h3 className="question">
          {currentIndex + 1}. {currentQuestion.question}
        </h3>
        <ul className="options-list">
          {currentQuestion.options.map((opt, i) => (
            <li
              key={i}
              className={`option ${
                selectedOption === i
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleOptionClick(i)}
            >
              {opt}
            </li>
          ))}
        </ul>
        <button className="next-btn" onClick={handleNext}>
          {currentIndex + 1 === questions.length ? "Finish Quiz" : "Next Question →"}
        </button>
      </div>
      <p className="progress">
        Question {currentIndex + 1} / {questions.length}
      </p>
    </div>
  );
}

export default App;
