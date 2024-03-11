import '../../bootstrap.js';

import axiosCall from '../../axiosCall.js';

import auth from '../../routes/auth.json';

export const getProfile = async () => {
	let url = import.meta.env.VITE_BASE_URL + auth.profile.getProfile;
	return axiosCall('get', url).then((response) => response);
};

export const changeProfile = async (payload) => {
	let url = import.meta.env.VITE_BASE_URL + auth.profile.getProfile;
	return axiosCall('put', url, payload).then((response) => response);
};

export const switchOtp = async (payload) => {
	let url = import.meta.env.VITE_BASE_URL + auth.profile.switchOtp;
	return axiosCall('post', url, payload).then((response) => response);
};

export const getOtpQrCode = async (payload) => {
	let url = import.meta.env.VITE_BASE_URL + auth.profile.getOtpQrCode;
	return axiosCall('post', url, payload).then((response) => response);
};

export const confirmOtp = async (payload) => {
	let url = import.meta.env.VITE_BASE_URL + auth.profile.confirmOtp;
	return axiosCall('post', url, payload).then((response) => response);
};

export const switchSms = async (payload) => {
	let url = import.meta.env.VITE_BASE_URL + auth.profile.switchSms;
	return axiosCall('post', url, payload).then((response) => response);
};

export const switchEmail = async (payload) => {
	let url = import.meta.env.VITE_BASE_URL + auth.profile.switchEmail;
	return axiosCall('post', url, payload).then((response) => response);
};

export const changeMaxSessions = async (payload) => {
	let url = import.meta.env.VITE_BASE_URL + auth.profile.changeMaxSessions;
	return axiosCall('post', url, payload).then((response) => response);
};

export const switchAuthByIp = async (payload) => {
	let url = import.meta.env.VITE_BASE_URL + auth.profile.switchAuthByIp;
	return axiosCall('post', url, payload).then((response) => response);
};

export const addIpToWhiteList = async (payload) => {
	let url = import.meta.env.VITE_BASE_URL + auth.profile.updateIpWhiteList;
	return axiosCall('post', url, payload).then((response) => response);
};

export const removeIpFromWhiteList = async (payload) => {
	let url = import.meta.env.VITE_BASE_URL + auth.profile.updateIpWhiteList;
	return axiosCall('post', url, payload).then((response) => response);
};

export const changePassword = async (payload) => {
	let url = import.meta.env.VITE_BASE_URL + auth.profile.changePassword;
	return axiosCall('post', url, payload).then((response) => response);
};

export const getHistoryDevices = async () => {
	let url = import.meta.env.VITE_BASE_URL + auth.profile.getHistoryDevices;
	return axiosCall('get', url).then((response) => response);
};

export const terminateIP = async (id) => {
	let url = import.meta.env.VITE_BASE_URL + auth.profile.terminateIP + '/' + id;
	return axiosCall('post', url, { _method: 'delete' }).then(
		(response) => response
	);
};

export const getApiKeys = async () => {
	let url = import.meta.env.VITE_BASE_URL + auth.profile.getApiKeys;
	return axiosCall('get', url).then((response) => response);
};

export const getLoginHistory = async () => {
	let url = import.meta.env.VITE_BASE_URL + auth.profile.getLoginHistory;
	return axiosCall('get', url).then((response) => response);
};

export const createTokenApi = async (payload) => {
	let url = import.meta.env.VITE_BASE_URL + auth.profile.createTokenApi;
	return axiosCall('post', url, payload).then((response) => response);
};
export const removeTokenApi = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL + auth.profile.removeTokenApi + '/' + id;
	return axiosCall('post', url, { _method: 'DELETE' }).then(
		(response) => response
	);
};

export const copyToken = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL + auth.profile.createTokenApi + '/' + id;
	return axiosCall('get', url).then((response) => response);
};
