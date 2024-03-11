import '../../bootstrap.js';

import axiosCall from '../../axiosCall.js';

import cloud from '../../routes/cloud.json';

export const getSnapshots = async () => {
	let url = import.meta.env.VITE_BASE_URL + cloud.snapshots.getSnapshots;
	return axiosCall('get', url).then((response) => response);
};

export const createSnapshot = async (object) => {
	let url = import.meta.env.VITE_BASE_URL + cloud.snapshots.createSnapshot;
	return axiosCall('post', url, object).then((response) => response);
};

export const getSnapshotInformation = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.snapshots.getSnapshotInformation.replace('{snapshot_id}', id);
	return axiosCall('get', url).then((response) => response);
};

export const deleteSnapshot = async (id) => {
	let url =
		import.meta.env.VITE_BASE_URL +
		cloud.snapshots.deleteSnapshot.replace('{snapshot_id}', id);
	return axiosCall('delete', url).then((response) => response);
};
