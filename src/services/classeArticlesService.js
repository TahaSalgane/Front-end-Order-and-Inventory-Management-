import httpService from "utils/httpService";

const endPoint = `${process.env.REACT_APP_API_URL}`;

export const getClasseArticles = (classe,eta) => httpService.get(`${endPoint}/articlesClasse/${classe}/${eta}`);
export const addNewArticle = (values) => httpService.post(`${endPoint}/addArticlesOnClasse`,values);
export const updateArticle = (values) => httpService.put(`${endPoint}/editArticlesOnClasse`,values);
export const deleteArticle = (classeID,articleId) => httpService.delete(`${endPoint}/deleteArticlesOnClasse/${classeID}/${articleId}`,); 