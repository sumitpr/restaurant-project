import {
	FETCH_BLOGS_REQUEST,
	FETCH_BLOGS_SUCCESS,
	FETCH_BLOGS_FAILURE,
	FETCH_BLOG_REQUEST,
	FETCH_BLOG_SUCCESS,
	FETCH_BLOG_FAILURE,
	ADD_BLOG,
	DELETE_BLOG,
	EDIT_BLOG,
} from "./actionTypes";

import blogsApi from "../../apis/blogsApi";

export function fetchBlogsRequest() {
	return {
		type: FETCH_BLOGS_REQUEST,
	};
}

export function fetchBlogsSuccess(users) {
	return {
		type: FETCH_BLOGS_SUCCESS,
		payload: users,
	};
}

export function fetchBlogsFailure(error) {
	return {
		type: FETCH_BLOGS_FAILURE,
		payload: error,
	};
}

export function fetchBlogs() {
	return (dispatch) => {
		dispatch(fetchBlogsRequest());
		blogsApi
			.get("/")
			.then((response) => {
				const blogs = response.data;
				dispatch(fetchBlogsSuccess(blogs));
			})
			.catch((e) => {
				const error = e.message;
				dispatch(fetchBlogsFailure(error));
			});
	};
}

export function fetchBlog(id) {
	return (dispatch) => {
		dispatch(fetchBlogRequest());
		blogsApi
			.get(`/${id}`)
			.then((response) => {
				const blog = response.data;
				dispatch(fetchBlogSuccess(blog));
			})
			.catch((e) => {
				const error = e.message;
				dispatch(fetchBlogFailure(error));
			});
	};
}

export function fetchBlogRequest() {
	return {
		type: FETCH_BLOG_REQUEST,
	};
}

export function fetchBlogSuccess(blog) {
	return {
		type: FETCH_BLOG_SUCCESS,
		payload: blog,
	};
}

export function fetchBlogFailure(error) {
	return {
		type: FETCH_BLOG_FAILURE,
		payload: error,
	};
}

export function addBlog(blogData) {
	return {
		type: ADD_BLOG,
		payload: {
			id: blogData.id,
			title: blogData.title,
			body: blogData.body,
		},
	};
}

export function deleteBlog(id) {
	return {
		type: DELETE_BLOG,
		payload: id,
	};
}

export function editBlog(id, newValues) {
	return {
		type: EDIT_BLOG,
		payload: {
			id,
			title: newValues.title,
			body: newValues.body,
		},
	};
}
