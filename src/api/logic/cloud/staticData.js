import '../../bootstrap.js';

import axiosCall from '../../axiosCall.js';

import cloud from '../../routes/cloud.json';

export const getDataCenters = async () => {
	let url = import.meta.env.VITE_BASE_URL + cloud.staticData.getDataCenters;
	return axiosCall('get', url).then((response) => response);
};

export const getOperatingSystems = async () => {
	let url =
		import.meta.env.VITE_BASE_URL + cloud.staticData.getOperatingSystems;
	return axiosCall('get', url).then((response) => response);
};
