import { searchingActions } from "../constants";
import { Alert } from "react-native";
const defaultState = {
  posts: [],
  users: [],
  groups: [],
  pages: [],
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case searchingActions.SEARCH_GROUPS_REQUEST:
      state = { ...state, groups: [] };
      return state;
      break;
    case searchingActions.SEARCH_GROUPS_SUCCESS:
      state = { ...state, groups: [...action.payload] };
      return state;
      break;
    case searchingActions.SEARCH_GROUPS_FAILURE:
      const { message } = action.error;

      return state;
      break;
    case searchingActions.SEARCH_PAGES_REQUEST:
      state = { ...state, pages: [] };
      return state;
      break;
    case searchingActions.SEARCH_PAGES_SUCCESS:
      state = { ...state, pages: [...action.payload] };
      return state;
      break;
    case searchingActions.SEARCH_PAGES_FAILURE:
      const { message2 } = action.error;

      return state;
      break;
    case searchingActions.SEARCH_USERS_REQUEST:
      state = { ...state, users: [] };
      return state;
      break;
    case searchingActions.SEARCH_USERS_SUCCESS:
      state = { ...state, users: [...action.payload] };
      return state;
      break;
    case searchingActions.SEARCH_USERS_FAILURE:
      const { message3 } = action.error;

      return state;
      break;
    case searchingActions.SEARCH_POSTS_REQUEST:
      state = { ...state, posts: [] };
      return state;
      break;
    case searchingActions.SEARCH_POSTS_SUCCESS:
      state = { ...state, posts: [...action.payload] };
      return state;
      break;
    case searchingActions.SEARCH_POSTS_FAILURE:
      const { message4 } = action.error;

      return state;
      break;
    default:
      return state;
  }
};
export default reducer;
