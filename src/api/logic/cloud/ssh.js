import '../../bootstrap.js';

import axiosCall from '../../axiosCall.js';

import cloud from '../../routes/cloud.json';

export const createNewSshkey = async (object) => {
	let url = import.meta.env.VITE_BASE_URL + cloud.ssh.createNewSshkey;
	return axiosCall('post', url, object).then((response) => response);
};

export const getListOfSshkeys = async () => {
	let url = import.meta.env.VITE_BASE_URL + cloud.ssh.getListOfSshkeys;
	return axiosCall('get', url).then((response) => response);
};

export const getSshkeyInformation = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.ssh.getSshkeyInformation.replace('{key_id}', id);
	return axiosCall('get', url).then((response) => response);
};

export const deleteSshkey = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.ssh.deleteSshkey.replace('{key_id}', id);
	return axiosCall('delete', url).then((response) => response);
};

export const getRandomSshkey = async () => {
	let url = import.meta.env.VITE_BASE_URL + cloud.ssh.getRandomSshkey;
	return axiosCall('get', url).then((response) => response);
};
