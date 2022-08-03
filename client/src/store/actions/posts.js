import * as api from '../../api';
import { CREATE_POST, DELETE_POST, FETCH_POSTS, LOADING, SCROLL_TO_FORM, SET_CURRENT_ID, UPDATE_POST } from './actionType';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_POSTS, payload: data })
    } catch (error) {
        console.log(error);
    }
};

export const createPost = (newPost) => async (dispatch) => {
    dispatch({ type: LOADING, payload: true })
    try {
        const { data } = await api.createPost(newPost);
        dispatch({ type: CREATE_POST, payload: data })
        const res = await api.fetchPosts();
        dispatch({ type: FETCH_POSTS, payload: res.data })
    } catch (error) {
        console.log(error);
    } finally {
        setTimeout(() => {
            dispatch({ type: LOADING, payload: false })
        }, 1000)
    }
}

export const updatePost = (id, updatedPost) => async (dispatch) => {
    dispatch({ type: LOADING, payload: true })
    try {
        const { data } = await api.updatePost(id, updatedPost);
        getPosts()
        dispatch({ type: UPDATE_POST, payload: data })
        const res = await api.fetchPosts();
        dispatch({ type: FETCH_POSTS, payload: res.data })
    } catch (error) {
        console.log(error);
    } finally {
        setTimeout(() => {
            dispatch({ type: LOADING, payload: false })
        }, 1000)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE_POST, payload: id })
    } catch (error) {
        console.log(error);
    }
}

export const setCurrentId = (post) => (dispatch) => {
    dispatch({ type: SET_CURRENT_ID, payload: post })
}

export const scrollToForm = (ref) => (dispatch) => {
    dispatch({ type: SCROLL_TO_FORM, payload: ref })
}
