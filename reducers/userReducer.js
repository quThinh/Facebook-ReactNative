import { userActions } from "../constants";
import { Alert } from "react-native";
const defaultState = {
  user: {},
  friends: [],
  posts: [],
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case userActions.LOGIN_REQUEST:
      state = { ...state, user: {} };
      return state;
      break;
    case userActions.LOGIN_SUCCESS:
      state = { ...state, user: action.payload };
      return state;
      break;
    case userActions.LOGIN_FAILURE:
      const { message } = action.error;

      return state;
      break;
    case userActions.FETCH_FRIENDS_REQUEST:
      state = { ...state, friends: [] };
      return state;
      break;
    case userActions.FETCH_FRIENDS_SUCCESS:
      state = { ...state, friends: [...action.payload] };
      return state;
      break;
    case userActions.FETCH_FRIENDS_FAILURE:
      const { message3 } = action.error;

      return state;
      break;
    case userActions.FETCH_PROFILE_POSTS_REQUEST:
      state = { ...state, posts: [] };
      return state;
      break;
    case userActions.FETCH_PROFILE_POSTS_SUCCESS:
      state = { ...state, posts: [...action.payload] };
      return state;
      break;
    case userActions.FETCH_PROFILE_POSTS_FAILURE:
      const { message4 } = action.error;

      return state;
      break;
    default:
      return state;
  }
};
export default reducer;
