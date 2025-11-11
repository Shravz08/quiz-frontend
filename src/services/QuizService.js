import API from "../api";

// ✅ Get all quizzes
export const getAllQuizzes = async () => {
  const response = await API.get("/quiz");
  return response.data;
};

// ✅ Get a quiz by ID
export const getQuizById = async (id) => {
  const response = await API.get(`/quizzes/${id}`);
  return response.data;
};

// ✅ Add a new quiz
export const addQuiz = async (quiz) => {
  const response = await API.post("/quizzes", quiz);
  return response.data;
};

// ✅ Update quiz
export const updateQuiz = async (id, quiz) => {
  const response = await API.put(`/quizzes/${id}`, quiz);
  return response.data;
};

// ✅ Delete quiz
export const deleteQuiz = async (id) => {
  const response = await API.delete(`/quizzes/${id}`);
  return response.data;
};

const QuizService = {
  startQuiz: async (category) => {
    const res = await API.get(`/quiz/start?category=${category}`);
    return res.data;
  },

  submitQuiz: async (answers) => {
    const res = await API.post("/quiz/submit", answers);
    return res.data;
  },
};

export default QuizService;