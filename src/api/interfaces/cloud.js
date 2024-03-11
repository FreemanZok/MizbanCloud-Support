import * as servers from '../logic/cloud/servers.js';
import * as firewall from '../logic/cloud/firewall.js';
import * as snapshots from '../logic/cloud/snapshots.js';
import * as ssh from '../logic/cloud/ssh.js';
import * as volumes from '../logic/cloud/volumes.js';
import * as staticData from '../logic/cloud/staticData.js';
import * as charts from '../logic/cloud/charts.js';

export const getListOfServers = async () => {
	return servers.getListOfServers().then((response) => response.data);
};

export const getTraffics = async () => {
	return servers.getTraffics().then((response) => response.data);
};

export const turnOnServer = async (id) => {
	return servers.turnOnServer(id).then((response) => response.data);
};

export const turnOffServer = async (id) => {
	return servers.turnOffServer(id).then((response) => response.data);
};

export const deleteServer = async (id) => {
	return servers.deleteServer(id).then((response) => response.data);
};

export const getServerInformation = async (id) => {
	return servers.getServerInformation(id).then((response) => response.data);
};

export const getServerPassword = async (id) => {
	return servers.getServerPassword(id).then((response) => response.data);
};

export const getServerLogs = async (id) => {
	return servers.getServerLogs(id).then((response) => response.data);
};

export const getServerVnc = async (id) => {
	return servers.getServerVnc(id).then((response) => response.data);
};

export const restartServer = async (id) => {
	return servers.restartServer(id).then((response) => response.data);
};

export const rebootServer = async (id) => {
	return servers.rebootServer(id).then((response) => response.data);
};

export const enableRescueMode = async (id, object) => {
	return servers.enableRescueMode(id, object).then((response) => response.data);
};

export const resetServerPassword = async (id, object) => {
	return servers
		.resetServerPassword(id, object)
		.then((response) => response.data);
};

export const enableAutopilotOnServer = async (id) => {
	return servers.enableAutopilotOnServer(id).then((response) => response.data);
};

export const disableAutopilotOnServer = async (id) => {
	return servers.disableAutopilotOnServer(id).then((response) => response.data);
};

export const createNewServer = async (obj) => {
	// check parameters
	const isValid = () => {
		if (typeof obj === 'object') {
			return true;
		} else {
			return false;
		}
	};
	if (isValid()) {
		return servers.createNewServer(obj).then((response) => response.data);
	} else {
		return 'Not a valid object';
	}
};

export const rebuildServerSoftware = async (id, obj) => {
	// check parameters
	const isValid = () => {
		if (typeof obj === 'object' && typeof id === 'number') {
			return true;
		} else {
			return false;
		}
	};
	if (isValid()) {
		return servers
			.rebuildServerSoftware(id, obj)
			.then((response) => response.data);
	} else {
		return 'One or more given parameters are invalid!';
	}
};

export const rebuildServerHardware = async (id, obj) => {
	// check parameters
	const isValid = () => {
		if (typeof obj === 'object' && typeof id === 'number') {
			return true;
		} else {
			return false;
		}
	};
	if (isValid()) {
		return servers
			.rebuildServerHardware(id, obj)
			.then((response) => response.data);
	} else {
		return 'One or more given parameters are invalid!';
	}
};

export const getListOfFirewalls = async (dataCenterId) => {
	// backend bug
	return firewall.getListOfFirewalls(dataCenterId).then((response) => {
		let firewallData = {
			success: true,
			data: response.data.data,
		};
		for (let firewall of firewallData.data) {
			if (typeof firewall.rules === 'object') {
				firewall.rules = Object.values(firewall.rules);
			}
		}
		return firewallData;
	});
};

export const getSnapshots = async () => {
	return snapshots.getSnapshots().then((response) => response.data);
};

export const getDataCenters = async () => {
	return staticData.getDataCenters().then((response) => response.data);
};

export const getOperatingSystems = async () => {
	return staticData.getOperatingSystems().then((response) => response.data);
};

export const getListOfSshkeys = async () => {
	return ssh.getListOfSshkeys().then((response) => response.data);
};

export const deleteSshkey = async (id) => {
	return ssh.deleteSshkey(id).then((response) => response.data);
};

export const getRandomSshkey = async () => {
	return ssh.getRandomSshkey().then((response) => response.data);
};

export const createNewSshkey = async (object) => {
	return ssh.createNewSshkey(object).then((response) => response.data);
};

export const createNewFirewall = async (object) => {
	return firewall.createNewFirewall(object).then((response) => response.data);
};

export const deleteFirewall = async (firewallId) => {
	return firewall.deleteFirewall(firewallId).then((response) => response.data);
};

export const deleteRule = async (ruleId) => {
	return firewall.deleteRule(ruleId).then((response) => response.data);
};

export const addNewRule = async (object) => {
	return firewall.addNewRule(object).then((response) => response.data);
};

export const deleteSnapshot = async (id) => {
	return snapshots.deleteSnapshot(id).then((response) => response.data);
};

export const createSnapshot = async (object) => {
	return snapshots.createSnapshot(object).then((response) => response.data);
};

// VOLUMES:
export const getListOfVolumes = async (id) => {
	return volumes.getListOfVolumes(id).then((response) => response.data);
};

export const attachVolume = async (object) => {
	return volumes.attachVolume(object).then((response) => response.data);
};

export const detachVolume = async (object) => {
	return volumes.detachVolume(object).then((response) => response.data);
};

export const createNewVolume = async (object) => {
	return volumes.createNewVolume(object).then((response) => response.data);
};

export const deleteVolume = async (id) => {
	return volumes.deleteVolume(id).then((response) => response.data);
};

export const editVolume = async (id, object) => {
	return volumes.editVolume(id, object).then((response) => response.data);
};

export const getServerChart = async (chart_number, object) => {
	return charts
		.getServerChart(chart_number, object)
		.then((response) => response.data);
};
