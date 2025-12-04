import API from "./api";

// =========================
//  QUESTIONS API SERVICE
// =========================

// Get all questions
export const getAllQuestions = async () => {
  const response = await API.get("/questions");
  return response.data;
};

// Get questions by quiz ID
export const getQuestionsByQuiz = async (quizId) => {
  const response = await API.get(`/questions/quiz/${quizId}`);
  return response.data;
};

// Get questions by subject
export const getAllQuestionsBySubject = async (subject) => {
  const response = await API.get(`/questions/${subject}`);
  return response.data;
};

// Add a new question
export const addQuestion = async (question) => {
  const response = await API.post("/questions", question);
  return response.data;
};

// Update question
export const updateQuestion = async (id, question) => {
  const response = await API.put(`/questions/${id}`, question);
  return response.data;
};

// Delete question
export const deleteQuestion = async (id) => {
  const response = await API.delete(`/questions/${id}`);
  return response.data;
};

// Clean default export
const QuestionService = {
  getAllQuestions,
  getQuestionsByQuiz,
  getAllQuestionsBySubject,
  addQuestion,
  updateQuestion,
  deleteQuestion,
};

export default QuestionService;
