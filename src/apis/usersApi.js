import axios from 'axios';

const usersApi = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com/users"
});

export default usersApi;