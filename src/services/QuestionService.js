import API from "../api";

// ✅ Get all questions
export const getAllQuestions = async () => {
  const response = await API.get("/questions");
  return response.data;
};

// ✅ Get questions by quiz ID
export const getQuestionsByQuiz = async (quizId) => {
  const response = await API.get(`/questions/quiz/${quizId}`);
  return response.data;
};

export const getAllQuestionsBySubject = async (subject) => {
  try {
    const response = await API.get(`/questions/${subject}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

// ✅ Add a new question
export const addQuestion = async (question) => {
  const response = await API.post("/questions", question);
  return response.data;
};

// ✅ Update a question
export const updateQuestion = async (id, question) => {
  const response = await API.put(`/questions/${id}`, question);
  return response.data;
};

// ✅ Delete a question
export const deleteQuestion = async (id) => {
  const response = await API.delete(`/questions/${id}`);
  return response.data;
};

const QuestionService = {
  getAllQuestions: async () => {
    const res = await API.get("/questions");
    return res.data;
  },

  addQuestion: async (questionData) => {
    const res = await API.post("/questions", questionData);
    return res.data;
  },
};

export default QuestionService;

