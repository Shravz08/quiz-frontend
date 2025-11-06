import React from "react";

const SubjectSelection = ({ quizData, onSelect }) => {
  return (
    <div id="subject-page">
      <h2>Select a Subject</h2>
      <div id="subjects">
        {Object.keys(quizData).map((subject, index) => (
          <button key={index} onClick={() => onSelect(subject)}>
            {subject.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelection;
