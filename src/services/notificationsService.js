import httpService from "utils/httpService";

const endPoint = `${process.env.REACT_APP_API_URL}`;

export const getNotifications = () => httpService.get(`${endPoint}/notifications`);
export const markOneAsRead = (id) => httpService.get(`${endPoint}/notificationAsRead/${id}`);
