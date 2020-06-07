import axios from 'axios';

const blogsApi = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com/posts"
});

export default blogsApi;