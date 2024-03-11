import '../../bootstrap.js';

import axiosCall from '../../axiosCall.js';

import financial from '../../routes/financial.json';

export const getWallet = async (userId) => {
	let url = import.meta.env.VITE_BASE_URL_ADMIN_TEMP + financial.wallet.get;
	let object = { user_id: userId };
	return axiosCall('get', url, object).then((res) => res.data);
};

export const changeWallet = async (amount, userId) => {
	let url = import.meta.env.VITE_BASE_URL_ADMIN_TEMP + financial.wallet.change;
	const formData = {
		amount: amount,
		user_id: userId,
		description: 'Account-Balance',
	};
	return axiosCall('post', url, formData).then((res) => res.data);
};
