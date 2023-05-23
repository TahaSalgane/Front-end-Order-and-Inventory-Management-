import httpService from "utils/httpService";

const endPoint = `${process.env.REACT_APP_API_URL}`;

export const getAllOrders = () => httpService.get(`${endPoint}/orders`);
export const createOrders = (values) => httpService.post(`${endPoint}/addOrder`,values);
export const updateOrder = (values) => httpService.put(`${endPoint}/editOrder/`,values);
export const deleteOrder = (id) => httpService.delete(`${endPoint}/deleteOrder/${id}`,);
