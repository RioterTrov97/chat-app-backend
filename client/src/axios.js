import axios from 'axios';

const instance = axios.create({
	//https://git.heroku.com/chat-app-socket-2021.git
	//http://localhost:8000
	baseURL: 'http://localhost:8000',
});

export const instanceAutoLogin = axios.create({
	baseURL: 'http://localhost:8000',
	headers: {
		Authorization: 'Bearer ' + window.localStorage.getItem('token'),
	},
});

export default instance;
