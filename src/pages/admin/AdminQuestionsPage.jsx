import React, { useEffect, useState } from "react";
import {
  getAllQuestions,
  deleteQuestion,
  createQuestion,
  updateQuestion,
} from "../../services/questionsService";
import QuestionForm from "../../components/QuestionForm";

const AdminQuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Load all questions
  const loadQuestions = async () => {
    const res = await getAllQuestions();
    setQuestions(res.data);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  // Delete Question
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      await deleteQuestion(id);
      loadQuestions();
    }
  };

  // Save (Create/Update)
  const handleSave = async (formData) => {
    if (editingQuestion) {
      await updateQuestion(editingQuestion.id, formData);
    } else {
      await createQuestion(formData);
    }
    setShowForm(false);
    setEditingQuestion(null);
    loadQuestions();
  };

  return (
    <div className="container mt-5">
      <h2>Manage Questions</h2>

      <button
        className="btn btn-primary my-3"
        onClick={() => {
          setEditingQuestion(null);
          setShowForm(true);
        }}
      >
        + Add Question
      </button>

      {showForm && (
        <QuestionForm
          initialData={editingQuestion}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Question Text</th>
            <th>Correct Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td>{q.id}</td>
              <td>{q.questionText}</td>
              <td>{q.correctAnswer}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mx-1"
                  onClick={() => {
                    setEditingQuestion(q);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>

                <Link
                  to={`/admin/questions/${q.id}`}
                  className="text-blue-600 underline"
                >
                  Manage Options
                </Link>


                <button
                  className="btn btn-danger btn-sm mx-1"
                  onClick={() => handleDelete(q.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminQuestionsPage;
