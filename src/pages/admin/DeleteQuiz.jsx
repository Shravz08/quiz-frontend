import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

export default function DeleteQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await api.delete(`/quizzes/${id}`);
    navigate("/admin/quizzes");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Are you sure you want to delete this quiz?</h2>

      <div className="flex gap-4 mt-4">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
          onClick={handleDelete}
        >
          Delete
        </button>

        <button
          className="bg-gray-400 text-white px-4 py-2 rounded-lg"
          onClick={() => navigate("/admin/quizzes")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
