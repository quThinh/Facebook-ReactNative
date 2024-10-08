import { categoryGroupListActions } from "../constants";
import { Alert } from "react-native";
const defaultState = [];
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case categoryGroupListActions.FETCH_CATEGORY_GROUPS_REQUEST:
      state = defaultState;
      return state;
      break;
    case categoryGroupListActions.FETCH_CATEGORY_GROUPS_SUCCESS:
      state = action.payload;
      return state;
      break;
    case categoryGroupListActions.FETCH_CATEGORY_GROUPS_FAILURE:
      const { message } = action.error;

      state = defaultState;
      return state;
      break;
    default:
      return state;
  }
};
export default reducer;
