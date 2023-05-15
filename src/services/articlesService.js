import httpService from "utils/httpService";

const endPoint = `${process.env.REACT_APP_API_URL}`;

export const getAllUsers = () => httpService.get(`${endPoint}/articles`);
export const createUser = (values) => httpService.post(`${endPoint}/addArticle`,values);
export const updateUser = (values) => httpService.put(`${endPoint}/editActicle/`,values);
export const deleteUser = (values) => httpService.delete(`${endPoint}/deleteArticle/`,values);
