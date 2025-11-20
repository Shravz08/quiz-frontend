import React from "react";
import "./SubjectPage.css";

const SubjectSelection = ({ quizData, onSelect }) => {
  if (!quizData) {
    return <h2 style={{ textAlign: "center" }}>Loading subjects...</h2>;
  }

  return (
    <div className="subject-container">
      <h1 className="subject-title">Choose a Subject 📚</h1>

      <div className="subject-grid">
        {Object.keys(quizData || {}).map((subject, index) => (
          <div
            key={index}
            className="subject-card"
            onClick={() => onSelect(subject)}
          >
            <div className="subject-icon">📘</div>
            <h3>{subject.toUpperCase()}</h3>
            <button onClick={logout}>Logout</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelection;
