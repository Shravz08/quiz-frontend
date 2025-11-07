import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [step, setStep] = useState("start");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const questions = [
    {
      question: "Which language runs in a web browser?",
      options: ["Python", "C", "Java", "JavaScript"],
      answer: "JavaScript",
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Central Style Sheets",
        "Cascading Style Sheets",
        "Computer Style System",
        "Creative Styling Syntax",
      ],
      answer: "Cascading Style Sheets",
    },
    {
      question: "Which company developed React?",
      options: ["Google", "Facebook", "Microsoft", "Amazon"],
      answer: "Facebook",
    },
  ];

  const handleOptionClick = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected === questions[currentQ].answer) {
      setScore(score + 1);
    }
    setSelected(null);
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep("result");
    }
  };

  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
      <AnimatePresence mode="wait">
        {step === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Welcome to the Quiz 🎯
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep("question")}
              className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-100 transition"
            >
              Start Quiz
            </motion.button>
          </motion.div>
        )}

        {step === "question" && (
          <motion.div
            key="question"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white text-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md"
          >
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <motion.div
                className="bg-indigo-600 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <div className="flex justify-between mb-4 text-sm text-gray-600">
              <span>
                Question {currentQ + 1} / {questions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
              {questions[currentQ].question}
            </h2>
            <div className="space-y-3">
              {questions[currentQ].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full px-4 py-2 rounded-lg border text-left transition-all text-sm sm:text-base ${
                    selected === option
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-100 hover:bg-indigo-100"
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
            <motion.button
              whileHover={selected ? { scale: 1.05 } : {}}
              whileTap={selected ? { scale: 0.95 } : {}}
              onClick={handleNext}
              disabled={!selected}
              className={`mt-6 w-full py-2 rounded-lg font-semibold transition ${
                selected
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-gray-400 cursor-not-allowed text-gray-100"
              }`}
            >
              Next
            </motion.button>
          </motion.div>
        )}

        {step === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="text-center bg-white text-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md"
          >
            <h2 className="text-3xl font-bold mb-4">Quiz Completed 🎉</h2>
            <p className="text-xl mb-6">
              Your Score:{" "}
              <span className="font-bold text-indigo-600">{score}</span> /{" "}
              {questions.length}
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setStep("start");
                setScore(0);
                setCurrentQ(0);
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Play Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
