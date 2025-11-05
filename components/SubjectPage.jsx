import React from "react";

function SubjectPage({ onSelect }) {
  return (
    <div className="page">
      <h2>Select a Subject</h2>
      <div className="subjects">
        <button onClick={() => onSelect("java")}>Java</button>
        <button onClick={() => onSelect("iot")}>IoT</button>
        <button onClick={() => onSelect("html")}>HTML</button>
      </div>
    </div>
  );
}

export default SubjectPage;
