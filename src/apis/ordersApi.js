import axios from 'axios';

const ordersApi = axios.create({
	baseURL: "localhost/orders/"
});

export default ordersApi;