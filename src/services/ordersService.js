import httpService from "utils/httpService";

const endPoint = `${process.env.REACT_APP_API_URL}`;

export const getAllOrders = () => httpService.get(`${endPoint}/orders`);
export const createOrders = (values) => httpService.post(`${endPoint}/orders`, values);
export const updateOrder = (id,values) => httpService.put(`${endPoint}/orders/${id}`,values);
export const deleteOrder = (id) => httpService.delete(`${endPoint}/orders/${id}`);
