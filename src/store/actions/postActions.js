import { DATA } from '../../data';
import { ADD_POST, LOAD_POSTS, REMOVE_POST, TOOGLE_BOOKED } from '../types';

export const loadPosts = () => {
	return {
		type: LOAD_POSTS,
		payload: DATA
	}
}

export const toggleBooked = id => {
	return {
		type: TOOGLE_BOOKED,
		payload: id
	}
}

export const removePost = id => {
	return {
		type: REMOVE_POST,
		payload: id
	}
}

export const addPost = post => {
	// console.log(post);	
	post.id = Date.now().toString()
	// console.log(post);
	return {
		type: ADD_POST,
		payload: post
	}
}
