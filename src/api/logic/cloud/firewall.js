import '../../bootstrap.js';

import axiosCall from '../../axiosCall.js';

import cloud from '../../routes/cloud.json';

export const createNewFirewall = async (object) => {
	let url = import.meta.env.VITE_BASE_URL + cloud.firewall.createNewFirewall;
	return axiosCall('post', url, object).then((response) => response);
};

export const addNewRule = async (object) => {
	let url = import.meta.env.VITE_BASE_URL + cloud.firewall.addNewRule;
	return axiosCall('post', url, object).then((response) => response);
};

export const getListOfFirewalls = async (dataCenterId) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.firewall.getListOfFirewalls +
		'?datacenter_id=' +
		dataCenterId;

	return axiosCall('get', url).then((response) => response);
};

export const deleteRule = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.firewall.deleteRule.replace('{rule_id}', id);
	return axiosCall('delete', url).then((response) => response);
};

export const deleteFirewall = async (firewallId) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.firewall.deleteFirewall.replace('{firewall_id}', firewallId);
	return axiosCall('delete', url).then((response) => response);
};
