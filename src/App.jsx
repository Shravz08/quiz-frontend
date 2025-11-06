import React, { useState } from "react";
import QuizPage from "./components/QuizPage";
import quizData from "./components/data/quizData"; // ✅ Importing quiz data
import "./App.css";

function App() {
  const [page, setPage] = useState("start");
  const [subject, setSubject] = useState("");
  const [finalScore, setFinalScore] = useState(0);

  // 🟢 Start the quiz
  const handleStart = () => setPage("subject");

  // 🟡 When a subject is selected
  const handleSubjectSelect = (selectedSubject) => {
    setSubject(selectedSubject);
    setPage("quiz");
  };

  // 🔵 When quiz finishes
  const handleFinish = (score) => {
    setFinalScore(score);
    setPage("score");
  };

  // 🟣 Restart the quiz
  const handleRestart = () => {
    setPage("start");
    setSubject("");
    setFinalScore(0);
  };

  return (
    <div className="container">
      {/* 🟢 Start Page */}
      {page === "start" && (
        <div id="start-page">
          <h1>Welcome to the Quiz App!</h1>
          <p>Test your knowledge and see how well you score.</p>
          <button className="btn" onClick={handleStart}>
            Start Quiz
          </button>
        </div>
      )}

      {/* 🟡 Subject Selection Page */}
      {page === "subject" && (
        <div id="subject-page">
          <h2>Select a Subject</h2>
          <div id="subjects">
            {/* 🔄 Auto-generate subject buttons from quizData */}
            {Object.keys(quizData).map((subj) => (
              <button
                key={subj}
                className="btn"
                onClick={() => handleSubjectSelect(subj)}
              >
                {subj.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 🔵 Quiz Page */}
      {page === "quiz" && (
        <QuizPage subject={subject} onFinish={handleFinish} />
      )}

      {/* 🟣 Score Page */}
      {page === "score" && (
        <div id="score-box">
          <h2>Your Score: {finalScore}</h2>
          <button className="btn" onClick={handleRestart}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
