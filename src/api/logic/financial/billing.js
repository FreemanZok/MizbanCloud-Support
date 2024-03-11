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

export const getGateways = async () => {
	const url = import.meta.env.VITE_BASE_URL + financial.billing.getGateways;

	return axiosCall('get', url).then((response) => response);
};

export const getInvoices = async (count, page, mock) => {
	const url =
		import.meta.env.VITE_BASE_URL_ADMIN_TEMP + financial.billing.getInvoices;
	const formData = {
		params: {
			count: count,
			page: page,
			...(mock === true && { mock: 'yes' }),
		},
	};

	return axiosCall('get', url, formData).then((response) => response);
};

/**
 * <tested>
 *@param {number} userId
 */

export const getTransactions = async (userId, count, page) => {
	const url =
		import.meta.env.VITE_BASE_URL_ADMIN_TEMP +
		financial.billing.getTransactions;
	const formData = {
		__search: `{"user_id":${userId}}`,
		count: count,
		page: page,
	};

	return axiosCall('get', url, formData).then((response) => response);
};

export const getBanksGateWay = async () => {
	const url = import.meta.env.VITE_BASE_URL + financial.billing.getBanksGateWay;
	return axiosCall('get', url).then((response) => response);
};

export const goCheckCoupon = async (payload) => {
	const url = import.meta.env.VITE_JUST_URL + financial.billing.goCheckCoupon;
	return axiosCall('post', url, payload).then((response) => response);
};
export const goPayMoney = async (payload) => {
	const url = import.meta.env.VITE_JUST_URL + financial.billing.goPayMoney;
	return axiosCall('post', url, payload).then((response) => response);
};
