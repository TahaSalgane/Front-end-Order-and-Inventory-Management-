import httpService from "utils/httpService";

const endPoint = `${process.env.REACT_APP_API_URL}`;

export const updatePasword = (values) => httpService.put(`${endPoint}/updatePasword`, values);