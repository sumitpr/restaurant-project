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
} from "../actions/actionTypes";

const initialState = {
	loading: false,
	blogs: [],
	currentBlog: null,
	error: "",
};

function blogsReducers(state = initialState, action) {
	switch (action.type) {
		case FETCH_BLOGS_REQUEST: {
			return { ...state, loading: true };
		}
		case FETCH_BLOGS_SUCCESS: {
			return {
				...state,
				loading: false,
				blogs: action.payload,
				error: "",
			};
		}
		case FETCH_BLOGS_FAILURE: {
			return {
				...state,
				loading: false,
				blogs: [],
				error: action.payload,
			};
		}

		case FETCH_BLOG_REQUEST: {
			return { ...state, currentBlog: null, loading: true };
		}

		case FETCH_BLOG_SUCCESS: {
			return { ...state, currentBlog: action.payload, loading: false };
		}

		case FETCH_BLOG_FAILURE: {
			return { ...state, currentBlog: null, loading: false, error: action.payload };
		}

		case ADD_BLOG: {
			const blogs = [...state.blogs, action.payload];
			return { ...state, blogs };
		}

		case DELETE_BLOG: {
			const blogs = [...state.blogs];
			const blogIndex = blogs.findIndex(
				(blog) => blog.id === action.payload
			);
			if (blogIndex >= 0) {
				blogs.splice(blogIndex, 1);
				return { ...state, blogs };
			} else {
				return state;
			}
		}

		case EDIT_BLOG: {
			const blogs = state.blogs.map((blog, index) => {
				if (blog.id === action.payload.id) {
					return {
						...blog,
						title: action.payload.title,
						body: action.payload.body,
					};
				}
				return blog;
			});

			return { ...state, blogs };
		}
		default: {
			return state;
		}
	}
}

export default blogsReducers;
