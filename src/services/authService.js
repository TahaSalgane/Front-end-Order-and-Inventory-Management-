import httpService from "utils/httpService";

const endPoint = `${process.env.REACT_APP_API_URL}`;

export const userLogin = (values) => httpService.post(`${endPoint}/login`, values);