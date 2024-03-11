import '../../bootstrap.js';

import axiosCall from '../../axiosCall.js';

import financial from '../../routes/financial.json';

export const getUsageData = async () => {
	const url = import.meta.env.VITE_BASE_URL + financial.reports.getUsageData;

	return axiosCall('get', url).then((response) => response);
};
