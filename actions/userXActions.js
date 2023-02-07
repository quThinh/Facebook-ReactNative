import { userXActions } from "../constants";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
export const FetchUserXRequest = (emailID) => {
  const taskURI = `/users/${emailID}`;
  return async (dispatch) => {
    axios
      .get(taskURI, {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "secure_token"
          )}`,
        },
      })
      .then((v) => {
        let user = v.data;
        dispatch(FetchUserXFriendsRequest(emailID));
        dispatch(FetchUserXProfilePostsRequest(emailID));
        dispatch(FetchUserXSuccess(user));
      })
      .catch((error) => {
        dispatch(FetchUserXFailure(error));
      });
  };
};
const FetchDefaultState = () => {
  return {
    type: userXActions.FETCH_USERX_REQUEST,
  };
};
export const FetchUserXFailure = (error) => {
  return {
    type: userXActions.FETCH_USERX_FAILURE,
    error,
  };
};
export const FetchUserXSuccess = (user) => {
  return {
    type: userXActions.FETCH_USERX_SUCCESS,
    payload: user,
  };
};
//Friends
export const FetchUserXFriendsRequest = (userId) => {
  const taskURI = `friends/list/${userId}`;
  return (dispatch) => {
    axios
      .get(taskURI)
      .then((v) => {
        const friends = v.data.listFriend;
        dispatch(FetchUserXFriendsSuccess(friends));
      })
      .catch((error) => {
        dispatch(FetchUserXFriendsFailure(error));
      });
  };
};
export const ResetUserX = () => {
  return {
    type: userXActions.RESET_USERX,
  };
};
export const FetchUserXFriendsFailure = (error) => {
  return {
    type: userXActions.FETCH_USERX_FRIENDS_FAILURE,
    error,
  };
};
export const FetchUserXFriendsSuccess = (friends) => {
  return {
    type: userXActions.FETCH_USERX_FRIENDS_SUCCESS,
    payload: friends,
  };
};
//Profie posts
export const FetchUserXProfilePostsRequest = (emailID) => {
  const taskURI = `articles?author=${emailID}`;
  return (dispatch) => {
    axios
      .get(taskURI)
      .then((v) => {
        const posts = v.data;
        dispatch(FetchUserXProfilePostsSuccess(posts));
      })
      .catch((error) => {
        dispatch(FetchUserXProfilePostsFailure(error));
      });
  };
};
export const FetchUserXProfilePostsFailure = (error) => {
  return {
    type: userXActions.FETCH_USERX_PROFILE_POSTS_FAILURE,
    error,
  };
};
export const FetchUserXProfilePostsSuccess = (posts) => {
  return {
    type: userXActions.FETCH_USERX_PROFILE_POSTS_SUCCESS,
    payload: posts,
  };
};
