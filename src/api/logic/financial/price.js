import '../../bootstrap.js';

import axiosCall from '../../axiosCall.js';

import financial from '../../routes/financial.json';

// A silly function to create FormData more easily
export const makeFormData = (requestData = {}, isJson = true) => {
	if (isJson) {
		return requestData;
	}
	let formData = new FormData();
	for (const key in requestData) {
		formData.append(key, requestData[key]);
	}

	return formData;
};

export const getPrices = async (userId) => {
	const url =
		import.meta.env.VITE_BASE_URL_ADMIN_TEMP + financial.price.getPrices;
	const obj = {
		user_id: userId,
	};
	return axiosCall('get', url, obj).then((response) => response.data);
};

export const getCustomPrices = async (userId) => {
	const url =
		import.meta.env.VITE_BASE_URL_ADMIN_TEMP + financial.price.getCustomPrices;
	return axiosCall('get', url + `?user_id=${userId}`).then(
		(response) => response.data
	);
};
