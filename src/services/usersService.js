import httpService from "utils/httpService";

const endPoint = `${process.env.REACT_APP_API_URL}`;

export const getAllUsers = () => httpService.get(`${endPoint}/users`);
export const createUser = (values) => httpService.post(`${endPoint}/users`,values);
export const updateUser = (id,values) => httpService.put(`${endPoint}/users/${id}`,values);
export const deleteUser = (userId) => httpService.delete(`${endPoint}/users/${userId}`);

export const updateProfile = (values) => httpService.post(`${endPoint}/updateProfile`, values);