import React, { useState } from "react";
import WelcomePage from "./components/WelcomePage";
import SubjectPage from "./components/SubjectPage";
import QuizPage from "./components/QuizPage";
import ResultPage from "./components/ResultPage";
import "./App.css";

function App() {
  const [page, setPage] = useState("welcome");
  const [subject, setSubject] = useState("");
  const [score, setScore] = useState(0);

  const handleStart = () => setPage("subjects");
  const handleSubjectSelect = (subj) => {
    setSubject(subj);
    setPage("quiz");
  };
  const handleFinish = (finalScore) => {
    setScore(finalScore);
    setPage("result");
  };
  const handleRestart = () => {
    setScore(0);
    setSubject("");
    setPage("welcome");
  };

  return (
    <div className="container">
      {page === "welcome" && <WelcomePage onStart={handleStart} />}
      {page === "subjects" && <SubjectPage onSelect={handleSubjectSelect} />}
      {page === "quiz" && <QuizPage subject={subject} onFinish={handleFinish} />}
      {page === "result" && <ResultPage score={score} onRestart={handleRestart} />}
    </div>
  );
}

export default App;
