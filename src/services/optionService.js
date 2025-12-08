import axios from "../api/axios";

const BASE_URL = "/options";

export const getAllOptions = () => axios.get(BASE_URL);

export const getOptionById = (id) => axios.get(`${BASE_URL}/${id}`);

export const createOption = (data) => axios.post(BASE_URL, data);

export const updateOption = (id, data) => axios.put(`${BASE_URL}/${id}`, data);

export const deleteOption = (id) => axios.delete(`${BASE_URL}/${id}`);
