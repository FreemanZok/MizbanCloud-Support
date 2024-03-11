import axios from 'axios';

// import router from '@/router/index.js';

import helpers from '@/plugins/helpers';

const axiosCall = async (method, url, options) => {
	// this will be the format of the axiosCall return value
	let axiosCallResponse = {
		success: false,
		statusCode: null,
		messege: '',
		data: {},
	};

	const handleErrorResponse = (error) => {
		if (error.response.status == '403') {
			helpers.showAlert('', 'لطفا دوباره وارد شوید', 'error', {
				bodyClass: ['bg-white', 'text-primary', 'fs-16', 'py-4'],
				showIcon: false,
			});

			// router.push('/logout');
		}
		if (error.response && error.response.data) {
			// server responds but with an error
			axiosCallResponse.data = error.response.data;
			axiosCallResponse.success = true;
			axiosCallResponse.statusCode = error.response.status;
			axiosCallResponse.messege = 'Status code out of the range of 2xx';
			console.log(axiosCallResponse.messege);
		} else if (error.request) {
			// no respone from server (possible port mistake)
			axiosCallResponse.messege =
				'The request was made but no response was received';
			console.log(axiosCallResponse.messege);
		} else {
			// network error
			axiosCallResponse.messege = 'Error on setting up the request';
			console.log(axiosCallResponse.messege);
		}

		return axiosCallResponse;
	};

	return await axios({
		method: method,
		url: url,
		data: options,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
		.then((res) => {
			// no error:
			axiosCallResponse.success = true;
			axiosCallResponse.messege =
				'Successfully communicated with server and no error recieved';
			axiosCallResponse.statusCode = res.status;
			axiosCallResponse.data = res.data;
			return axiosCallResponse;
			// error:
		})
		.catch((error) => handleErrorResponse(error));
};

export default axiosCall;
