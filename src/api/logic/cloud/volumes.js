import '../../bootstrap.js';

import axiosCall from '../../axiosCall.js';

import cloud from '../../routes/cloud.json';

export const getListOfVolumes = async () => {
	let url = import.meta.env.VITE_BASE_URL + cloud.volumes.getListOfVolumes;
	return axiosCall('get', url).then((response) => response);
};

export const createNewVolume = async (object) => {
	const url = import.meta.env.VITE_BASE_URL + cloud.volumes.createNewVolume;
	return axiosCall('post', url, object).then((response) => response);
};

export const getVolumeInformation = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.volumes.getVolumeInformation.replace('{volume_id}', id);
	return axiosCall('get', url).then((response) => response);
};

export const attachVolume = async (object) => {
	const url = import.meta.env.VITE_BASE_URL + cloud.volumes.attachVolume;
	return axiosCall('post', url, object).then((response) => response);
};

export const detachVolume = async (object) => {
	const url = import.meta.env.VITE_BASE_URL + cloud.volumes.detachVolume;
	return axiosCall('post', url, object).then((response) => response);
};

export const editVolume = async (id, object) => {
	const url =
		import.meta.env.VITE_BASE_URL +
		cloud.volumes.editVolume.replace('{volume_id}', id);
	return axiosCall('put', url, object).then((response) => response);
};

export const deleteVolume = async (id) => {
	const url =
		import.meta.env.VITE_BASE_URL +
		cloud.volumes.deleteVolume.replace('{volume_id}', id);
	return axiosCall('delete', url).then((response) => response);
};
