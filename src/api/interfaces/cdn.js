import * as domains from '../logic/cdn/domains.js';
import * as cluster from '../logic/cdn/cluster.js';
import * as plans from '../logic/cdn/plans.js';

/**
 * Gets websites (domains) list
 * @param {number} count
 * @param {number} page
 */
export const getWebsites = async (count, page) => {
	const res = await domains.getWebsites(count, page).then((res) => res);
	let response = {
		success: false,
		message: 'خطا در دریافت اطلاعات دامنه‌ها.',
	};
	if (res.data.success) {
		let tempDomains = res?.data?.data || [];
		let domains = [];
		for (const key in tempDomains) {
			domains.push({
				id: tempDomains[key].domainid,
				webid: tempDomains[key].webid,
				domain: key,
				plan: tempDomains[key].plan,
				planDetail: tempDomains[key].plansdet,
				data: tempDomains[key].data || [],
				status: tempDomains[key].domainstatus || [],
				cloud: tempDomains[key].domainstatus == 1,
				couldText: tempDomains[key].domainstatus == 1 ? 'فعال' : 'غیرفعال',
				date: 'تاریخ ارسال نشده',
				// date: tempDomains[key].date || this.$helpers.jDate(Date.now(), 'jYYYY/jMM/jDD HH:mm')
			});
		}
		response = {
			success: true,
			domains: domains,
		};
	}
	return response;
};

/**
 * Adds new domain (website)
 * @param {string} domainName
 */

export const submitNewDomain = async (domainName) => {
	return domains.submitNewDomain(domainName).then((response) => response.data);
};
export const getDomains = async () => {
	return domains.getDomains().then((response) => response.data);
};
export const deleteDomain = async (domainId) => {
	return domains.deleteDomain(domainId).then((response) => response.data);
};
export const getDomainSelf = async (id) => {
	return domains.getDomainSelf(id).then((response) => response.data);
};
export const getDnsRecords = async (domainId) => {
	return domains.getDnsRecords(domainId).then((response) => response.data).catch((error) => error);
};
export const changeDnsSec = async (domainId, payload) => {
	return domains
		.changeDnsSec(domainId, payload)
		.then((response) => response.data);
};
export const createDnsRecord = async (domainId, payload) => {
	return domains
		.createDnsRecord(domainId, payload)
		.then((response) => response.data);
};
export const updateDnsRecord = async (domainId, payload, id) => {
	return domains
		.updateDnsRecord(domainId, payload, id)
		.then((response) => response.data);
};
export const uploadFile = async (domainId, payload) => {
	return domains
		.uploadFile(domainId, payload)
		.then((response) => response.data);
};
export const deleteDnsRecord = async (domainId, recordId) => {
	return domains
		.deleteDnsRecord(domainId, recordId)
		.then((response) => response.data);
};
export const getDomainDnsRecords = async (domainName, count, page) => {
	const res = await domains
		.getDomainDnsRecords(domainName, count, page)
		.then((res) => res);
	const response = {
		success: res?.data?.success || false,
		countofpage: res?.data?.count || 0,
		currentpage: res?.data?.page || 1,
		records: res?.data?.data.records || {},
		message: res?.data?.message || 'خطا در دریافت اطلاعات رکوردهای DNS',
	};
	for (const recKey in response.records) {
		response.records[recKey].success =
			response.records[recKey].status.toLowerCase() === 'success';
		delete response.records[recKey].status;
	}
	return response;
};

/**
 * Adds ns record for domain
 * @param {object} data
 */
export const addDomainDnsRecord = async (data) => {
	const res = await domains.addDomainDnsRecord(data).then((res) => res);
	return res.data;
};

/**
 * Edits an existing ns record
 * @param {object} data
 * @param {number} recordId
 */
export const editDomainDnsRecord = async (data, recordId) => {
	const res = await domains
		.editDomainDnsRecord(data, recordId)
		.then((res) => res);
	return res.data;
};

/**
 * Deletes an existing ns record
 * @param {string} domainName
 * @param {number} domainId
 * @param {number} recordId
 */
export const deleteDomainDnsRecord = async (domainName, domainId, recordId) => {
	const res = await domains
		.deleteDomainDnsRecord(domainName, domainId, recordId)
		.then((res) => res);
	return res.data;
};

/**
 * Gets domain's global data
 * @param {number} domainId
 */
export const getDomainMainRecord = async (domainId) => {
	const res = await domains.getDomainMainRecord(domainId).then((res) => res);
	return res.data;
};

/**
 * Gets DNSSEC data
 * @param {string} domainName
 * @param {number} domainId
 */
export const getDomainSecure = async (domainName, domainId) => {
	const res = await domains
		.getDomainSecure(domainName, domainId)
		.then((res) => res);
	return res.data;
};

/**
 * Updates DNSSEC
 * @param {string} domainName
 * @param {number} domainId
 * @param {????} status
 */
export const setDnsSecStatus = async (domainName, domainId, status) => {
	const res = await domains
		.setDnsSecStatus(domainName, domainId, status)
		.then((res) => res);
	return res.data;
};

/**
 * Gets domain's A-Record clusters in DNS section
 * @param {string} domainName
 * @param {number} recordId
 */
export const getDomainRecordClusters = async (domainName, recordId) => {
	const res = await domains
		.getDomainRecordClusters(domainName, recordId)
		.then((res) => res);
	return res.data;
};

/**
 * Gets domain's name-servers
 * @param {string} domainName
 * @param {number} domainId
 */
export const getDomainNameServers = async (domainName, domainId) => {
	const res = await domains
		.getDomainNameServers(domainName, domainId)
		.then((res) => res);
	return res.data;
};

/**
 * Edits custom name-servers for a PRO or ORG domain plan
 * @param {number} domainId
 * @param {string} ns1
 * @param {string} ns2
 */
export const updateDomainNameServers = async (domainId, ns1, ns2) => {
	const res = await domains
		.updateDomainNameServers(domainId, ns1, ns2)
		.then((res) => res);
	return res.data;
};

/**
 * Edits dns-record proxy setting
 * @param {string} domainName
 * @param {number} domainId
 * @param {number} recordId
 * @param {?} status
 */
export const changeCloudStatus = async (
	domainName,
	domainId,
	recordId,
	status
) => {
	const res = await domains
		.changeCloudStatus(domainName, domainId, recordId, status)
		.then((res) => res);
	return res.data;
};

/**
 * Downloads DNS zone setting file
 * @param {string} domainName
 * @param {number} domainId
 */
export const downloadZoneFile = async (domainName, domainId) => {
	const res = await domains
		.changeCloudStatus(domainName, domainId)
		.then((res) => res);
	return res.data;
};

/**
 * Uploads DNS zone setting file
 * @param {object} formData
 */
export const uploadZoneFile = async (formData) => {
	const res = await domains.uploadZoneFile(formData).then((res) => res);
	return res.data;
};

/**
 * Gets system DNS plans
 */
export const getDnsPlans = async () => {
	const res = await plans.getDnsPlans().then((res) => res);
	let recievedPlans = [];
	if (typeof res?.data === 'object') {
		for (const key in res?.data) {
			recievedPlans.push({
				key: key,
				value: res?.data[key],
			});
		}
	}
	const response = {
		success: res?.data?.success || false,
		plans: recievedPlans,
	};

	return response;
};

// Clusters

/**
 * Gets domain's clusters
 * @param {string} domainName
 * @param {number} domainId
 * @param {number} websiteId
 * @param {string} websiteName
 */
export const getClusters = async (
	domainName,
	domainId,
	websiteId,
	websiteName
) => {
	const res = await cluster
		.getClusters(domainName, domainId, websiteId, websiteName)
		.then((res) => res);
	return res.data;
};

/**
 * Adds new domain's cluster
 * @param {string} domainName
 * @param {number} domainId
 * @param {} protocol
 * @param {string} method
 * @param {string} name
 */
export const addCluster = async (
	domainName,
	domainId,
	protocol,
	method,
	name
) => {
	const res = await cluster
		.getClusters(domainName, domainId, protocol, method, name)
		.then((res) => res);
	return res.data;
};

/**
 * Updates existing domain's cluster
 * @param {string} domainName
 * @param {number} domainId
 * @param {number} clusterId
 * @param {string} protocol
 * @param {string} method
 * @param {string} name
 */
export const updateCluster = async (
	domainName,
	domainId,
	clusterId,
	protocol,
	method,
	name
) => {
	const res = await cluster
		.updateCluster(domainName, domainId, clusterId, protocol, method, name)
		.then((res) => res);
	return res.data;
};

/**
 * Deletes existing domain's cluster
 * @param {string} domainName
 * @param {number} domainId
 * @param {number} clusterId
 * @param {number} websiteId
 * @param {string} websiteName
 */
export const deleteCluster = async (
	domainName,
	domainId,
	clusterId,
	websiteId,
	websiteName
) => {
	const res = await cluster
		.deleteCluster(domainName, domainId, clusterId, websiteId, websiteName)
		.then((res) => res);
	return res.data;
};

/**
 * Adds new domain's SUB cluster
 * @param {number} clusterId
 * @param {number} weight
 * @param {number} port
 * @param {string} source
 */
export const addSubCluster = async (clusterId, weight, port, source) => {
	const res = await cluster
		.addSubCluster(clusterId, weight, port, source)
		.then((res) => res);
	return res.data;
};

/**
 * Updates existing domain's SUB cluster
 * @param {number} clusterId
 * @param {number} serverId
 * @param {number} weight
 * @param {number} port
 * @param {string} source
 */
export const updateSubCluster = async (
	clusterId,
	serverId,
	weight,
	port,
	source
) => {
	const res = await cluster
		.updateSubCluster(clusterId, serverId, weight, port, source)
		.then((res) => res);
	return res.data;
};

/**
 * Deletes existing domain's SUB cluster
 * @param {number} clusterId
 * @param {number} serverId
 */
export const deleteSubCluster = async (clusterId, serverId) => {
	const res = await cluster
		.deleteSubCluster(clusterId, serverId)
		.then((res) => res);
	return res.data;
};

/**
 * Assigns cluster
 * @param {string} domainName
 * @param {number} domainId
 * @param {number} websiteId
 * @param {number} clusterId
 * @param {string} action
 */
export const assignCluster = async (
	domainName,
	domainId,
	websiteId,
	clusterId,
	action
) => {
	const res = await cluster
		.deleteSubCluster(domainName, domainId, websiteId, clusterId, action)
		.then((res) => res);
	return res.data;
};

export const getPlans = async () => {
	return plans.getPlans().then((response) => response.data);
};

export const submitPlan = async (myData) => {
	return plans.submitPlan(myData).then((response) => response.data);
};
