import '../../bootstrap.js';

import axiosCall from '../../axiosCall.js';

import cdn from '../../routes/cdn.json';

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

export const getClusters = async (
	domainName,
	domainId,
	websiteId,
	websiteName
) => {
	const url = import.meta.env.VITE_BASE_URL + cdn.cluster.getClusters;
	const formData = makeFormData({
		params: {
			domain: domainName,
			domain_id: domainId,
			website: websiteName === null ? domainName : websiteName,
			website_id: websiteId,
		},
	});

	return axiosCall('get', url, formData).then((response) => response);
};

export const addCluster = async (
	domainName,
	domainId,
	protocol,
	method,
	name
) => {
	const url = import.meta.env.VITE_BASE_URL + cdn.cluster.addCluster;
	const formData = makeFormData({
		domain: domainName,
		domain_id: domainId,
		protocol: protocol,
		method: method,
		name: name,
	});

	return axiosCall('post', url, formData).then((response) => response);
};

export const updateCluster = async (
	domainName,
	domainId,
	clusterId,
	protocol,
	method,
	name
) => {
	const url =
		import.meta.env.VITE_BASE_URL +
		cdn.cluster.updateCluster.replace('{cluster_id}', clusterId);
	const formData = makeFormData({
		domain: domainName,
		domain_id: domainId,
		protocol: protocol,
		method: method,
		name: name,
	});

	return axiosCall('put', url, formData).then((response) => response);
};

export const deleteCluster = async (
	domainName,
	domainId,
	clusterId,
	websiteId,
	websiteName = null
) => {
	const url =
		import.meta.env.VITE_BASE_URL +
		cdn.cluster.deleteCluster.replace('{cluster_id}', clusterId);
	const formData = makeFormData({
		domain: domainName,
		domain_id: domainId,
		website: websiteName === null ? domainName : websiteName,
		website_id: websiteId,
		cluster_id: clusterId,
	});

	return axiosCall('delete', url, formData).then((response) => response);
};

export const addSubCluster = async (clusterId, weight, port, source) => {
	const url =
		import.meta.env.VITE_BASE_URL +
		cdn.cluster.addSubCluster.replace('{cluster_id}', clusterId);
	const formData = makeFormData({
		weight: weight,
		port: port,
		source: source,
	});

	return axiosCall('post', url, formData).then((response) => response);
};

export const updateSubCluster = async (
	clusterId,
	serverId,
	weight,
	port,
	source
) => {
	const url =
		import.meta.env.VITE_BASE_URL +
		cdn.cluster.addSubCluster
			.replace('{cluster_id}', clusterId)
			.replace('{server_id}', serverId);
	const formData = makeFormData({
		weight: weight,
		port: port,
		source: source,
	});

	return axiosCall('put', url, formData).then((response) => response);
};

export const deleteSubCluster = async (clusterId, serverId) => {
	const url =
		import.meta.env.VITE_BASE_URL +
		cdn.cluster.addSubCluster
			.replace('{cluster_id}', clusterId)
			.replace('{server_id}', serverId);

	return axiosCall('delete', url).then((response) => response);
};

export const assignCluster = async (
	domainId,
	domainName,
	websiteId,
	clusterId,
	action
) => {
	const url = import.meta.env.VITE_BASE_URL + cdn.cluster.assignCluster;
	const formData = {
		domain_id: domainId,
		domain: domainName,
		website_id: websiteId,
		cluster_id: clusterId,
		action: action,
	};

	return axiosCall('put', url, formData).then((response) => response);
};
