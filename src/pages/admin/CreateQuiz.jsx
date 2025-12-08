import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/quizzes", { title, description });

    navigate("/admin/quizzes");
  };

  return (
    <div className="p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl mb-6 font-semibold"
      >
        Create New Quiz
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="w-full border rounded-lg p-2 mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Create Quiz
        </button>
      </form>
    </div>
  );
}
