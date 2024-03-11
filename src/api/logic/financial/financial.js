import axiosCall from '../../axiosCall.js';
import financial from '../../routes/financial.json';

// export const fileUploader = async (sending_data) => {
// 	const url = import.meta.env.VITE_JUST_URL + financial.fileUploader;
// 	return axiosCall('post', url, sending_data).then((response) => response);
// };

export const getLastInvoice = async () => {
	const url =
		import.meta.env.VITE_BASE_URL + financial.financial.getLastInvoice;
	return axiosCall('get', url).then((response) => response);
};

export const getInvoices = async () => {
	const url = import.meta.env.VITE_BASE_URL + financial.financial.getInvoices;
	return axiosCall('get', url).then((response) => response);
};

export const getWallet = async () => {
	const url = import.meta.env.VITE_BASE_URL + financial.financial.getWallet;
	return axiosCall('get', url).then((response) => response);
};

export const getBanks = async () => {
	const url = import.meta.env.VITE_BASE_URL + financial.financial.getBanks;
	return axiosCall('get', url).then((response) => response);
};
export const getTransactions = async () => {
	const url =
		import.meta.env.VITE_BASE_URL + financial.financial.getTransactions;
	return axiosCall('get', url).then((response) => response);
};
