import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchDashboardData } from "../services/DashboardService";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchDashboardData()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load dashboard");
        setLoading(false);
      });
  }, []);

  // Loader Animation
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <motion.div
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
        ></motion.div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-md mb-6"
      >
        <h1 className="text-2xl font-bold text-blue-600">
          Welcome Back, {user?.username}
        </h1>
        <p className="text-gray-600 mt-1">
          Let’s continue your learning journey 🌟
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Subjects", value: data.subjectCount, color: "blue" },
          { label: "Quizzes Attempted", value: data.quizAttempts, color: "green" },
          { label: "Highest Score", value: `${data.bestScore}%`, color: "purple" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
            className="bg-white shadow p-6 rounded-xl"
          >
            <h3 className="text-gray-500 text-sm">{item.label}</h3>
            <p className={`text-3xl font-bold text-${item.color}-600`}>
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Quizzes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white shadow p-6 rounded-xl mt-6"
      >
        <h3 className="text-lg font-semibold mb-4">Recent Quiz Results</h3>

        {data.recentResults?.length === 0 ? (
          <p className="text-gray-500">No recent quizzes</p>
        ) : (
          <ul className="space-y-3">
            {data.recentResults.map((quiz, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex justify-between items-center border-b pb-2"
              >
                <p>{quiz.quizName}</p>
                <span className="font-bold text-green-600">{quiz.score}%</span>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
