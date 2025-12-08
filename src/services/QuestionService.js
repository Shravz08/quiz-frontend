import axios from "../api/axios";

const BASE_URL = "/questions";

export const getAllQuestions = () => axios.get(BASE_URL);

export const getQuestionById = (id) => axios.get(`${BASE_URL}/${id}`);

export const createQuestion = (data) => axios.post(BASE_URL, data);

export const updateQuestion = (id, data) => axios.put(`${BASE_URL}/${id}`, data);

export const deleteQuestion = (id) => axios.delete(`${BASE_URL}/${id}`);
