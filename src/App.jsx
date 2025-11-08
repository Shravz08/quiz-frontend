import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [step, setStep] = useState("start");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isTimeRunning, setIsTimeRunning] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [isOptionDisabled, setIsOptionDisabled] = useState(false);

    // Question sets by level
  const questionSets = {
    Beginner: [
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
    ],
    Intermediate: [
      {
        question: "Who developed React?",
        options: ["Google", "Facebook", "Microsoft", "Amazon"],
        answer: "Facebook",
      },
      {
        question: "Which tag is used to include JavaScript in HTML?",
        options: ["<js>", "<script>", "<javascript>", "<code>"],
        answer: "<script>",
      },
    ],
    Expert: [
      {
        question: "Which hook is used for managing state in React?",
        options: ["useEffect", "useState", "useMemo", "useRef"],
        answer: "useState",
      },
      {
        question: "What does JSX stand for?",
        options: [
          "Java Syntax Extension",
          "JavaScript XML",
          "JSON X",
          "Java Source X",
        ],
        answer: "JavaScript XML",
      },
    ],
  };

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [questions, setQuestions] = useState([]);


  // Timer logic
  useEffect(() => {
    if (!isTimeRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeRunning(false);
          setTimeout(() => {
            handleNext();
          }, 300);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQ, isTimeRunning]);

  const handleOptionClick = (option) => {
    if (isOptionDisabled) return;

    setSelected(option);
    setIsOptionDisabled(true);
    setIsTimeRunning(false);

    const isCorrect = option === questions[currentQ].answer;
    setFeedback(isCorrect ? "correct" : "incorrect");

    if (isCorrect) setScore((s) => s + 1);

    // Wait 1 second to show color, then next question
    setTimeout(() => {
      setFeedback(null);
      setSelected(null);
      setIsOptionDisabled(false);
      setIsTimeRunning(true);
      handleNext();
    }, 1000);
  };

  const handleNext = () => {
    setFeedback(null);
    setIsTimeRunning(false);

    setTimeout(() => {
      setTimeLeft(10);
      setIsTimeRunning(true);
    }, 300);

    setSelected(null);

    if (currentQ + 1 < questions.length) {
      setCurrentQ((q) => q + 1);
    } else {
      setStep("result");
    }
  };

  const progress = ((currentQ + 1) / questions.length) * 100;

  // Generate random confetti pieces
  const renderConfetti = () => {
    const emojis = ["🎉", "✨", "🎊", "🥳", "🏆"];
    const pieces = Array.from({ length: 20 });

    return pieces.map((_, index) => (
      <motion.span
        key={index}
        className="absolute text-2xl select-none"
        initial={{
          x: Math.random() * 300 - 150,
          y: Math.random() * -100 - 50,
          opacity: 1,
          rotate: 0,
        }}
        animate={{
          y: 300,
          opacity: 0,
          rotate: 360,
        }}
        transition={{
          duration: 2 + Math.random() * 1.5,
          delay: Math.random() * 0.3,
          repeat: 0,
        }}
        style={{
          left: "50%",
          top: "0",
        }}
      >
        {emojis[Math.floor(Math.random() * emojis.length)]}
      </motion.span>
    ));
  };

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
    <p className="text-lg mb-4">Select a Level to Begin:</p>
    <div className="space-y-3">
      {Object.keys(questionSets).map((level) => (
        <motion.button
          key={level}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setSelectedLevel(level);
            // Shuffle questions before starting
            const shuffled = [...questionSets[level]].sort(
              () => Math.random() - 0.5
            );
            setQuestions(shuffled);
            setStep("question");
            setCurrentQ(0);
            setScore(0);
            setTimeLeft(10);
          }}
          className="block w-full px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-100 transition"
        >
          {level}
        </motion.button>
      ))}
    </div>
  </motion.div>
)}
        {step === "question" && (
  <motion.div
    key={`question-${currentQ}`} // key must change per question for animation
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.4 }}
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
            <p className="text-sm text-gray-500 text-center mb-2">
  Level: <span className="font-semibold text-indigo-600">{selectedLevel}</span>
</p>
            {/* Circular Timer */}
            <div className="relative flex justify-center mb-4">
              <motion.svg
                width="80"
                height="80"
                className="transform -rotate-90"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="#E5E7EB"
                  strokeWidth="6"
                  fill="transparent"
                />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="#6366F1"
                  strokeWidth="6"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray="220"
                  strokeDashoffset={220 - (220 * timeLeft) / 10}
                  transition={{ duration: 1, ease: "linear" }}
                />
              </motion.svg>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-indigo-600">
                {timeLeft}s
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
              {questions[currentQ].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQ].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={!isOptionDisabled ? { scale: 1.02 } : {}}
                  whileTap={!isOptionDisabled ? { scale: 0.97 } : {}}
                  onClick={() => handleOptionClick(option)}
                  disabled={isOptionDisabled}
                  className={`w-full px-4 py-2 rounded-lg border text-left transition-all text-sm sm:text-base
                    ${
                      selected === option
                        ? feedback === "correct"
                          ? "bg-green-500 text-white border-green-600"
                          : feedback === "incorrect"
                          ? "bg-red-500 text-white border-red-600"
                          : "bg-indigo-500 text-white"
                        : "bg-gray-100 hover:bg-indigo-100"
                    }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

{step === "result" && (
  <motion.div
    key="result"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.6 }}
    className="relative text-center bg-white text-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md overflow-hidden"
  >
    {/* Confetti Animation */}
    <div className="absolute inset-0 pointer-events-none">
      {renderConfetti()}
    </div>

    <h2 className="text-3xl font-bold mb-4">Quiz Completed 🎉</h2>
    <p className="text-xl mb-6">
      Your Score:{" "}
      <span className="font-bold text-indigo-600">{score}</span> /{" "}
      {questions.length}
    </p>

    {/* Animated Scoreboard */}
    <div className="space-y-4 mb-8">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-green-600">Correct Answers ✅</span>
          <span>{score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-green-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(score / questions.length) * 100}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-red-600">Wrong Answers ❌</span>
          <span>{questions.length - score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-red-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((questions.length - score) / questions.length) * 100}%`,
            }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
    </div>

    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        setStep("start");
        setScore(0);
        setCurrentQ(0);
        setTimeLeft(10);
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
