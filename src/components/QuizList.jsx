import React, { useEffect, useState } from "react";
import "./QuizListPage.css";
import { useNavigate } from "react-router-dom";

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8082/api/quizzes") // your Spring Boot quiz API
      .then((res) => res.json())
      .then((data) => setQuizzes(data))
      .catch((err) => console.error("Error loading quizzes:", err));
  }, []);

  const openQuiz = (id) => {
    navigate(`/quiz/${id}`);
  };

  return (
    <div className="quizlist-container">
      <h1 className="title">Choose Your Quiz</h1>
      <p className="subtitle">Select a quiz and start your challenge 🎯</p>

      <div className="quiz-grid">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-card" onClick={() => openQuiz(quiz.id)}>
            <h3>{quiz.title}</h3>
            <p>{quiz.description || "Test your knowledge!"}</p>
            <button>Start Quiz ➜</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizListPage;
