import httpService from "utils/httpService";

const endPoint = `${process.env.REACT_APP_API_URL}`;

export const getAllReclamations = () => httpService.get(`${endPoint}/reclamations`);
export const createReclamations = (values) => httpService.post(`${endPoint}/reclamations`, values);
export const deleteReclamation = (id) => httpService.delete(`${endPoint}/reclamations/${id}`);
