import axios from 'axios';
axios.defaults.headers.common['Authorization'] =
	import.meta.env.VITE_AUTH_TOKEN;
