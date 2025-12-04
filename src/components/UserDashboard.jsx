import React from "react";
import { motion } from "framer-motion";

export default function UserDashboard({ user, quizzes, onLogout }) {
  // Calculate stats
  const totalQuizzes = quizzes.length;
  const completedQuizzes = quizzes.filter(q => q.score !== null).length;
  const accuracy =
    quizzes.length > 0
      ? Math.round(
          quizzes.reduce((sum, q) => sum + (q.score || 0), 0) / quizzes.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome, {user.username} 👋
        </h1>
        <p className="text-gray-600 mt-2">{user.email}</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-700">Total Quizzes</h2>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{totalQuizzes}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-700">Completed</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">{completedQuizzes}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-700">Accuracy</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">{accuracy}%</p>
        </motion.div>
      </div>

      {/* Completed Quizzes List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-md mb-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Completed Quizzes
        </h2>

        {quizzes.length === 0 ? (
          <p className="text-gray-600">You haven’t completed any quizzes yet.</p>
        ) : (
          <ul className="space-y-3">
            {quizzes.map((quiz, idx) => (
              <li
                key={idx}
                className="flex justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <span className="font-medium text-gray-800">{quiz.title}</span>
                <span className="text-indigo-600 font-semibold">
                  Score: {quiz.score ?? 0}%
                </span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="max-w-5xl mx-auto flex gap-4 flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => window.location.href = "/subjects"}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold transition"
        >
          Start Quiz
        </button>

        <button
          onClick={() => window.location.href = "/result"}
          className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-black font-semibold transition"
        >
          View Results
        </button>

        <button
          onClick={onLogout}
          className="ml-auto px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold transition"
        >
          Logout
        </button>
      </motion.div>
    </div>
  );
}
