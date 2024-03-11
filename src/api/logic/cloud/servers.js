import '../../bootstrap.js';
import axiosCall from '../../axiosCall.js';
import cloud from '../../routes/cloud.json';

export const getListOfServers = async () => {
	let url = import.meta.env.VITE_BASE_URL + cloud.servers.getListOfServers;
	return axiosCall('get', url).then((response) => response);
};

export const createNewServer = async (object) => {
	let url = import.meta.env.VITE_BASE_URL + cloud.servers.createNewServer;
	return axiosCall('post', url, object).then((response) => response);
};

export const getServerInformation = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.getServerInformation.replace('{server_id}', id);
	return axiosCall('get', url).then((response) => response);
};

export const rebuildServerSoftware = async (id, object) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.rebuildServerSoftware.replace('{server_id}', id);
	return axiosCall('put', url, object).then((response) => response);
};

export const rebuildServerHardware = async (id, object) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.rebuildServerHardware.replace('{server_id}', id);
	return axiosCall('put', url, object).then((response) => response);
};

export const turnOnServer = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.turnOnServer.replace('{server_id}', id);
	return axiosCall('put', url).then((response) => response);
};

export const turnOffServer = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.turnOffServer.replace('{server_id}', id);
	return axiosCall('put', url).then((response) => response);
};

export const rebootServer = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.rebootServer.replace('{server_id}', id);
	return axiosCall('put', url).then((response) => response);
};

export const restartServer = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.restartServer.replace('{server_id}', id);
	return axiosCall('put', url).then((response) => response);
};

export const enableAutopilotOnServer = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.enableAutopilotOnServer.replace('{server_id}', id);
	return axiosCall('post', url).then((response) => response);
};

export const disableAutopilotOnServer = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.disableAutopilotOnServer.replace('{server_id}', id);
	return axiosCall('delete', url).then((response) => response);
};

export const getServerLogs = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.getServerLogs.replace('{server_id}', id);
	return axiosCall('get', url).then((response) => response);
};

export const getServerReports = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.getServerReports.replace('{server_id}', id);
	return axiosCall('get', url).then((response) => response);
};

export const resetServerPassword = async (id, object) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.resetServerPassword.replace('{server_id}', id);
	return axiosCall('put', url, object).then((response) => response);
};

export const getServerPassword = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.getServerPassword.replace('{server_id}', id);
	return axiosCall('post', url).then((response) => response);
};

export const enableRescueMode = async (id, object) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.enableRescueMode.replace('{server_id}', id);
	return axiosCall('post', url, object).then((response) => response);
};

export const disableRescueMode = async (id, object) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.disableRescueMode.replace('{server_id}', id);
	return axiosCall('post', url, object).then((response) => response);
};

export const permenantServer = async (id, object) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.permenantServer.replace('{server_id}', id);
	return axiosCall('post', url, object).then((response) => response);
};

export const getServerState = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.getServerState.replace('{server_id}', id);
	return axiosCall('get', url).then((response) => response);
};

export const deleteServer = async (id, object) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.deleteServer.replace('{server_id}', id);
	return axiosCall('delete', url, object).then((response) => response);
};

export const getTraffics = async () => {
	let url = import.meta.env.VITE_BASE_URL + cloud.servers.getTraffics;
	return axiosCall('get', url).then((response) => response);
};

export const getServerVnc = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.servers.getServerVnc.replace('{server_id}', id);
	return axiosCall('get', url).then((response) => response);
};
