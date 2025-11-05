import React, { useState } from "react";

const quizData = {
  java: [
    { question: "What does JVM stand for?", options: ["Java Virtual Machine", "Java Variable Method", "Just Virtual Machine", "Java Verified Mode"], answer: 0 },
    { question: "Which company developed Java?", options: ["Microsoft", "Sun Microsystems", "Google", "IBM"], answer: 1 },
    { question: "Which keyword is used to inherit a class in Java?", options: ["this", "super", "extends", "implements"], answer: 2 }
  ],
  iot: [
    { question: "IoT stands for?", options: ["Internet of Things", "Internet on Time", "Integration of Technology", "Input of Tools"], answer: 0 },
    { question: "Which protocol is widely used in IoT?", options: ["HTTP", "MQTT", "FTP", "SMTP"], answer: 1 },
    { question: "IoT devices are connected via?", options: ["LAN", "Internet", "Bluetooth", "All of these"], answer: 3 }
  ],
  html: [
    { question: "HTML stands for?", options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "High Text Markup Language", "None"], answer: 1 },
    { question: "Which tag creates a paragraph?", options: ["<head>", "<p>", "<body>", "<br>"], answer: 1 },
    { question: "Which attribute sets image source?", options: ["src", "href", "link", "img"], answer: 0 }
  ]
};

function QuizPage({ subject, onFinish }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const questions = quizData[subject];
  const current = questions[index];

  const handleAnswer = (i) => {
    if (i === current.answer) setScore(score + 1);
    if (index + 1 < questions.length) setIndex(index + 1);
    else onFinish(score + (i === current.answer ? 1 : 0));
  };

  return (
    <div className="page">
      <h3>{`Question ${index + 1} of ${questions.length}`}</h3>
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
