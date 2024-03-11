import '../../bootstrap.js';

import axiosCall from '../../axiosCall.js';

import cdn from '../../routes/cdn.json';

export const getDnsPlans = async () => {
	const url = import.meta.env.VITE_BASE_URL + cdn.plans.getDnsPlans;

	return axiosCall('get', url).then((response) => response);
};

export const getPlans = async () => {
	const url = import.meta.env.VITE_BASE_URL + cdn.plans.getPlans;
	return axiosCall('get', url).then((response) => response);
};

export const submitPlan = async (payload) => {
	const url = import.meta.env.VITE_BASE_URL + cdn.plans.submitPlan;
	return axiosCall('post', url, payload).then((response) => response);
};
