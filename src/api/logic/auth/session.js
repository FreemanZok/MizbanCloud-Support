import '../../bootstrap.js';

import axiosCall from '../../axiosCall.js';

import auth from '../../routes/auth.json';

export const logoutUser = async () => {
	let url = import.meta.env.VITE_BASE_URL_NO_PREFIX + auth.session.logoutUser;
	return axiosCall('get', url).then((response) => response);
};
