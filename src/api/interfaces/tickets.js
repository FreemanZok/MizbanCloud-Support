import axiosCall from '../axiosCall.js';
import tickets from '../routes/tickets.json';

export const getAllTickets = async () => {
	const url = import.meta.env.VITE_JUST_URL + tickets.getAllTickets;
	return axiosCall('get', url).then((response) => response);
};

export const getOneTicket = async (ticket_id) => {
	const url =
		import.meta.env.VITE_JUST_URL +
		tickets.getOneTicket.replace('{ticket_id}', ticket_id);
	return axiosCall('get', url).then((response) => response);
};

export const getDepartments = async () => {
	const url = import.meta.env.VITE_JUST_URL + tickets.getDepartments;
	return axiosCall('get', url).then((response) => response);
};

export const getServices = async () => {
	const url = import.meta.env.VITE_JUST_URL + tickets.getServices;
	return axiosCall('get', url).then((response) => response);
};

export const fileUploader = async (sending_data) => {
	const url = import.meta.env.VITE_JUST_URL + tickets.fileUploader;
	return axiosCall('post', url, sending_data).then((response) => response);
};

export const storeTicket = async (sending_data) => {
	const url = import.meta.env.VITE_JUST_URL + tickets.storeTicket;
	return axiosCall('post', url, sending_data).then((response) => response);
};

export const replyTicket = async (sending_data) => {
	const url = import.meta.env.VITE_JUST_URL + tickets.storeReply;
	return axiosCall('post', url, sending_data).then((response) => response);
};

export const closeTicket = async (ticket_id) => {
	const url =
		import.meta.env.VITE_JUST_URL +
		tickets.closeTicket.replace('{ticket_id}', ticket_id);
	return axiosCall('get', url).then((response) => response);
};

export const openTicket = async (ticket_id) => {
	const url =
		import.meta.env.VITE_JUST_URL +
		tickets.openTicket.replace('{ticket_id}', ticket_id);
	return axiosCall('get', url).then((response) => response);
};
