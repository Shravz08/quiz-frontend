import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    try {
      const res = await api.get("/quizzes");
      setQuizzes(res.data);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-semibold mb-6"
      >
        Manage Quizzes
      </motion.h1>

      <button
        onClick={() => navigate("/admin/quizzes/create")}
        className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        + Create New Quiz
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {quizzes.map((quiz) => (
            <motion.div
              key={quiz.id}
              whileHover={{ scale: 1.03 }}
              className="p-4 border rounded-xl shadow-sm bg-white"
            >
              <h2 className="text-xl font-semibold">{quiz.title}</h2>
              <p className="text-gray-500 mt-2">{quiz.description}</p>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => navigate(`/admin/quizzes/edit/${quiz.id}`)}
                  className="px-3 py-1 bg-green-600 text-white rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/admin/quizzes/delete/${quiz.id}`)}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
