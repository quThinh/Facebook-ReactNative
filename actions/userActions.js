import { userActions } from "../constants";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
export const LoginRequest = () => {
  const taskURI = `users`;
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
        const user = v.data;
        dispatch(FetchFriendsRequest(user.id));
        dispatch(FetchProfilePostsRequest(user.id));
        dispatch(LoginSuccess(user));
      })
      .catch((error) => {
        dispatch(LoginFailure(error));
      });
  };
};
const FetchDefaultState = () => {
  return {
    type: userActions.LOGIN_REQUEST,
  };
};
export const LoginFailure = (error) => {
  return {
    type: userActions.LOGIN_FAILURE,
    error,
  };
};
export const LoginSuccess = (user) => {
  return {
    type: userActions.LOGIN_SUCCESS,
    payload: user,
  };
};
//Friends
export const FetchFriendsRequest = (userId) => {
  const taskURI = `friends/all-be-request`;
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
        const user = v.data;
        const friendsWithRecent = user.friends;
        const ids = friendsWithRecent?.map((friend) => friend.userId);
        const queryIds = ids.join("&id=");
        const taskURI2 = `/users?id=${queryIds}`;
        axios
          .get(taskURI2)
          .then((result) => {
            let friends = result.data;
            friends = friends.map((friend, index) => {
              friend.isRecent = friendsWithRecent[index].isRecent || false;
              friend.mutualFriends = friendsWithRecent[index].mutualFriends;
              return friend;
            });
            dispatch(FetchFriendsSuccess(friends));
          })
          .catch((error) => {
            dispatch(FetchFriendsFailure(error));
          });
      })
      .catch((error) => {
        dispatch(FetchFriendsFailure(error));
      });
  };
};
export const FetchFriendsFailure = (error) => {
  return {
    type: userActions.FETCH_FRIENDS_FAILURE,
    error,
  };
};
export const FetchFriendsSuccess = (friends) => {
  return {
    type: userActions.FETCH_FRIENDS_SUCCESS,
    payload: friends,
  };
};
//Profie posts
export const FetchProfilePostsRequest = (userId) => {
  const taskURI = `articles/user/${userId}`;
  return (dispatch) => {
    axios
      .get(taskURI)
      .then((v) => {
        const posts = v.data;
        dispatch(FetchProfilePostsSuccess(posts));
      })
      .catch((error) => {
        dispatch(FetchProfilePostsFailure(error));
      });
  };
};
export const FetchProfilePostsFailure = (error) => {
  return {
    type: userActions.FETCH_PROFILE_POSTS_FAILURE,
    error,
  };
};
export const FetchProfilePostsSuccess = (posts) => {
  return {
    type: userActions.FETCH_PROFILE_POSTS_SUCCESS,
    payload: posts,
  };
};
