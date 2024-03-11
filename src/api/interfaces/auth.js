import * as session from '../logic/auth/session.js';
import * as profile from '../logic/auth/profile.js';

export const logoutUser = async () => {
	return session.logoutUser().then((response) => response.data);
};

export const getProfile = async () => {
	return profile.getProfile().then((response) => response.data);
};

export const changeProfile = async (payload) => {
	return profile.changeProfile(payload).then((response) => response.data);
};

export const switchOtp = async (payload) => {
	return profile.switchOtp(payload).then((response) => response.data);
};

export const getOtpQrCode = async (payload) => {
	return profile.getOtpQrCode(payload).then((response) => response.data);
};

export const confirmOtp = async (payload) => {
	return profile.confirmOtp(payload).then((response) => response.data);
};

export const switchSms = async (payload) => {
	return profile.switchSms(payload).then((response) => response.data);
};

export const switchEmail = async (payload) => {
	return profile.switchEmail(payload).then((response) => response.data);
};

export const changeMaxSessions = async (payload) => {
	return profile.changeMaxSessions(payload).then((response) => response.data);
};

export const switchAuthByIp = async (payload) => {
	return profile.switchAuthByIp(payload).then((response) => response.data);
};

export const addIpToWhiteList = async (payload) => {
	return profile.addIpToWhiteList(payload).then((response) => response.data);
};

export const removeIpFromWhiteList = async (payload) => {
	return profile
		.removeIpFromWhiteList(payload)
		.then((response) => response.data);
};

export const changePassword = async (payload) => {
	return profile.changePassword(payload).then((response) => response.data);
};

export const getHistoryDevices = async (payload) => {
	return profile.getHistoryDevices(payload).then((response) => response.data);
};

export const terminateIP = async (id) => {
	return profile.terminateIP(id).then((response) => response.data);
};

export const getApiKeys = async () => {
	return profile.getApiKeys().then((response) => response.data);
};

export const getLoginHistory = async () => {
	return profile.getLoginHistory().then((response) => response.data);
};

export const getOsList = async () => {
	return profile.getLoginHistory().then((response) => response.data);
};

export const createTokenApi = async (payload) => {
	return profile.createTokenApi(payload).then((response) => response.data);
};
export const removeTokenApi = async (id) => {
	return profile.removeTokenApi(id).then((response) => response.data);
};
export const copyToken = async (id) => {
	return profile.copyToken(id).then((response) => response.data);
};
