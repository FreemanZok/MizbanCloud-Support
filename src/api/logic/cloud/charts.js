import '../../bootstrap.js';

import axiosCall from '../../axiosCall.js';

import cloud from '../../routes/cloud.json';

export const getServerChart = async (chart_number, object) => {
	let url =
		import.meta.env.VITE_BASE_URL_NO_PREFIX +
		cloud.charts.getServerChart.replace('{chart_number}', chart_number);

	return axiosCall('post', url, object).then((response) => response);
};
