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

export const getWebsites = async (count, page) => {
	const url = import.meta.env.VITE_BASE_URL + cdn.domains.getWebsites;
	const formData = {
		count: count,
		page: page,
	};

	return axiosCall('get', url, formData).then((response) => response);
};

export const submitNewDomain = async (domainName) => {
	let url = import.meta.env.VITE_BASE_URL + cdn.domains.submitNewDomain;
	const formData = makeFormData({
		domain: domainName,
	});
	return axiosCall('post', url, formData).then((response) => response);
};
export const getDomainSelf = async (domainId) => {
	const url =
		import.meta.env.VITE_BASE_URL +
		cdn.domains.getDomainSelf.replace('{domain_id}', domainId);
	return axiosCall('get', url).then((response) => response);
};
export const deleteDomain = async (domainId) => {
	const url =
		import.meta.env.VITE_BASE_URL +
		cdn.domains.deleteDomain.replace('{domain_id}', domainId);
	return axiosCall('post', url, { _method: 'DELETE' }).then(
		(response) => response
	);
};

export const getDnsRecords = async (domainId) => {
	const url =
		import.meta.env.VITE_BASE_URL +
		cdn.domains.getDnsRecords.replace('{domain_id}', domainId) +
		'/dns';
	return axiosCall('get', url).then((response) => response).catch((error) => error);
	;
};
export const createDnsRecord = async (domainId, payload) => {
	const url =
		import.meta.env.VITE_BASE_URL +
		cdn.domains.createDnsRecord.replace('{domain_id}', domainId);
	return axiosCall('post', url, payload).then((response) => response);
};

export const updateDnsRecord = async (domainId, payload, id) => {
	const url =
		import.meta.env.VITE_BASE_URL +
		cdn.domains.updateDnsRecord.replace('{domain_id}', domainId) +
		'/' +
		id;
	return axiosCall('post', url, payload).then((response) => response);
};
export const uploadFile = async (domainId, payload) => {
	const url =
		import.meta.env.VITE_BASE_URL +
		cdn.domains.uploadFile.replace('{domain_id}', domainId);
	return axiosCall('post', url, payload).then((response) => response);
};
export const changeDnsSec = async (domainId, payload) => {
	const url =
		import.meta.env.VITE_BASE_URL +
		cdn.domains.dnsSec.replace('{domain_id}', domainId);
	return axiosCall('post', url, payload).then((response) => response);
};

export const deleteDnsRecord = async (domainId, recordId) => {
	const url =
		import.meta.env.VITE_BASE_URL +
		cdn.domains.deleteDnsRecord
			.replace('{domain_id}', domainId)
			.replace('{record_id}', recordId);
	return axiosCall('delete', url).then((response) => response);
};

export const getDomainDnsRecords = async (domainName, count, page) => {
	const url = import.meta.env.VITE_BASE_URL + cdn.domains.getDomainDnsRecords;
	const formData = {
		domain: domainName,
		count: count,
		page: page,
	};

	return axiosCall('get', url, formData).then((response) => response);
};

export const addDomainDnsRecord = async (data) => {
	const url = import.meta.env.VITE_BASE_URL + cdn.domains.addDomainDnsRecord;
	const formData = makeFormData(data);

	return axiosCall('post', url, formData).then((response) => response);
};

export const editDomainDnsRecord = async (data, recordId) => {
	const url =
		import.meta.env.VITE_BASE_URL +
		cdn.domains.editDomainDnsRecord.replace('{record_id}', recordId);
	const formData = makeFormData(data);

	return axiosCall('put', url, formData).then((response) => response);
};

export const deleteDomainDnsRecord = async (domainName, domainId, recordId) => {
	const url =
		import.meta.env.VITE_BASE_URL +
		cdn.domains.deleteDomainDnsRecord.replace('{record_id}', recordId);
	const formData = {
		domain: domainName,
		domain_id: domainId,
		record_id: recordId,
	};

	return axiosCall('delete', url, formData).then((response) => response);
};

export const getDomainMainRecord = async (domainId) => {
	const url = import.meta.env.VITE_BASE_URL + cdn.domains.getDomainMainRecord;
	const formData = {
		domain_id: domainId,
	};

	return axiosCall('get', url, formData).then((response) => response);
};

export const getDomainSecure = async (domaiName, domainId) => {
	const url = import.meta.env.VITE_BASE_URL + cdn.domains.getDomainSecure;
	const formData = {
		domain: domaiName,
		domain_id: domainId,
	};

	return axiosCall('get', url, formData).then((response) => response);
};

export const setDnsSecStatus = async (domainName, domainId, status = null) => {
	const url = import.meta.env.VITE_BASE_URL + cdn.domains.setDnsSecStatus;
	const formData = makeFormData({
		domain: domainName,
		domain_id: domainId,
		...(status !== null && { status: status }),
	});

	if (status != null) {
		return axiosCall('put', url, formData).then((response) => response);
	} else {
		return axiosCall('post', url, formData).then((response) => response);
	}
};

export const getDomainRecordClusters = async (domainName, recordId) => {
	const url =
		import.meta.env.VITE_BASE_URL + cdn.domains.getDomainRecordClusters;
	const formData = {
		domain: domainName,
		record_id: recordId,
	};

	return axiosCall('get', url, formData).then((response) => response);
};

export const getDomainNameServers = async (domainName, domainId) => {
	const url = import.meta.env.VITE_BASE_URL + cdn.domains.getDomainNameServers;
	const formData = makeFormData({
		domain: domainName,
		domain_id: domainId,
	});

	return axiosCall('get', url, formData).then((response) => response);
};

export const updateDomainNameServers = async (domainId, ns1, ns2) => {
	const url =
		import.meta.env.VITE_BASE_URL + cdn.domains.updateDomainNameServers;
	const formData = makeFormData({
		domain_id: domainId,
		ns1: ns1,
		ns2: ns2,
	});

	return axiosCall('post', url, formData).then((response) => response);
};

export const changeCloudStatus = async (
	domainName,
	domainId,
	recordId,
	status
) => {
	const url = import.meta.env.VITE_BASE_URL + cdn.domains.changeCloudStatus;
	const formData = makeFormData({
		domain: domainName,
		domain_id: domainId,
		record_id: recordId,
		...(status !== null && { status: status }),
	});

	return axiosCall('post', url, formData).then((response) => response);
};

export const downloadZoneFile = async (domainName, domainId) => {
	const url = import.meta.env.VITE_BASE_URL + cdn.domains.downloadZoneFile;
	const formData = makeFormData({
		domain: domainName,
		did: domainId,
	});

	return axiosCall('post', url, formData).then((response) => response);
};

export const uploadZoneFile = async (formData) => {
	const url = import.meta.env.VITE_BASE_URL + cdn.domains.uploadZoneFile;

	return axiosCall('post', url, formData).then((response) => response);
};

export const getDomains = async () => {
	const url = import.meta.env.VITE_BASE_URL + cdn.domains.getDomains;
	return axiosCall('get', url).then((response) => response);
};
