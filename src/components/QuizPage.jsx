import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

function QuizPage() {
  const { subject } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    api.get(`/quiz/${subject}`).then((res) => {
      setQuestions(res.data);
    });
  }, [subject]);

  return (
    <div>
      <h2>{subject} Quiz</h2>

      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <h4>{q.question}</h4>
          {q.options.map((opt) => (
            <p>{opt}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default QuizPage;
