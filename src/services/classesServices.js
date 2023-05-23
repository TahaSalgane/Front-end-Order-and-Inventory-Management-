import httpService from "utils/httpService";

const endPoint = `${process.env.REACT_APP_API_URL}`;

export const getAllClasses = (etablissement) => httpService.get(`${endPoint}/classes/${etablissement}`);
export const createClass = (values) => httpService.post(`${endPoint}/addClasse`,values);
export const updateClass = (values) => httpService.put(`${endPoint}/editClasse`,values);
export const deleteClass = (id) => httpService.delete(`${endPoint}/deleteClasse/${id}`,);
