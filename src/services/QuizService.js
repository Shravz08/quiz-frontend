import api from "./api";

// ✅ Fetch all quizzes
export const getAllQuizzes = async () => {
  const response = await api.get("/quiz");
  return response.data;
};

// ✅ Fetch quiz by ID
export const getQuizById = async (id) => {
  const response = await api.get(`/quiz/${id}`);
  return response.data;
};

// ✅ Add a new quiz
export const addQuiz = async (quiz) => {
  const response = await api.post("/quiz", quiz);
  return response.data;
};

// ✅ Update an existing quiz
export const updateQuiz = async (id, quiz) => {
  const response = await api.put(`/quiz/${id}`, quiz);
  return response.data;
};

// ✅ Delete a quiz
export const deleteQuiz = async (id) => {
  const response = await api.delete(`/quiz/${id}`);
  return response.data;
};

// ✅ Start a quiz by category
export const startQuiz = async (category) => {
  const response = await api.get(`/quiz/start?category=${category}`);
  return response.data;
};

// ✅ Submit quiz answers
export const submitQuiz = async (quizId, answers) => {
  const response = await api.post(`/quiz/${quizId}/submit`, { answers });
  return response.data;
};
