import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import api from "../api/axios";

export default function AdminQuizCRUD() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);

  const [form, setForm] = useState({ title: "", description: "" });

  const fetchQuizzes = async () => {
    try {
      const res = await api.get("/admin/quizzes");
      setQuizzes(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const openAddModal = () => {
    setEditingQuiz(null);
    setForm({ title: "", description: "" });
    setOpenModal(true);
  };

  const openEditModal = (quiz) => {
    setEditingQuiz(quiz);
    setForm({ title: quiz.title, description: quiz.description });
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingQuiz) {
        await api.put(`/admin/quizzes/${editingQuiz._id}`, form);
      } else {
        await api.post("/admin/quizzes", form);
      }
      fetchQuizzes();
      setOpenModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteQuiz = async (id) => {
    try {
      await api.delete(`/admin/quizzes/${id}`);
      fetchQuizzes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quiz Management</h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center gap-2 shadow"
        >
          <Plus size={20} /> Add Quiz
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizzes.map((quiz) => (
            <motion.div
              key={quiz._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white rounded-2xl shadow border"
            >
              <h2 className="font-semibold text-xl">{quiz.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(quiz)}
                  className="px-3 py-1 bg-yellow-400 rounded-xl flex items-center gap-1"
                >
                  <Pencil size={16} /> Edit
                </button>
                <button
                  onClick={() => deleteQuiz(quiz._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-xl flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingQuiz ? "Edit Quiz" : "Add Quiz"}
              </h2>
              <button onClick={() => setOpenModal(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Quiz Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border p-2 rounded-xl"
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="border p-2 rounded-xl min-h-[100px]"
              />

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-xl mt-2"
              >
                {editingQuiz ? "Update" : "Create"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
