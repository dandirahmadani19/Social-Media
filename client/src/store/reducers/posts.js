import {
  CREATE_POST,
  DELETE_POST,
  FETCH_POSTS,
  LOADING,
  SET_CURRENT_ID,
  UPDATE_POST,
  SCROLL_TO_FORM
} from "../actions/actionType";
const initialState = {
  posts: [],
  post: null,
  loading: false,
  scrollToForm: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload.length ? action.payload : state.posts,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts
          .map((e) => (e._id !== action.payload._id ? e : action.payload))
          .sort((a, b) => new Date(a.createdAt) < new Date(b.createdAt)),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
      };
    case SET_CURRENT_ID:
      return {
        ...state,
        post: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SCROLL_TO_FORM:
      return {
        ...state,
        scrollToForm: action.payload,
      };
    default:
      return state;
  }
}
