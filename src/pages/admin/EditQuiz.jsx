import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditQuiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/quizzes/${id}`).then((res) => setQuiz(res.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/quizzes/${id}`, quiz);
    navigate("/admin/quizzes");
  };

  return (
    <div className="p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl mb-6 font-semibold"
      >
        Edit Quiz
      </motion.h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mt-1"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="w-full border rounded-lg p-2 mt-1"
            value={quiz.description}
            onChange={(e) =>
              setQuiz({ ...quiz, description: e.target.value })
            }
          />
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
          Save Changes
        </button>
      </form>
    </div>
  );
}
