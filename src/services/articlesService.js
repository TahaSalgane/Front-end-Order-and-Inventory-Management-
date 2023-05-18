import httpService from "utils/httpService";

const endPoint = `${process.env.REACT_APP_API_URL}`;

export const getAllArticles = () => httpService.get(`${endPoint}/articles`);
export const createArticle = (values) => httpService.post(`${endPoint}/addArticle`,values);
export const updateArticle = (values) => httpService.put(`${endPoint}/editActicle/`,values);
export const deleteArticle = (id) => httpService.delete(`${endPoint}/deleteArticle/${id}`,);
