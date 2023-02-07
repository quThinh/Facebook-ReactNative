import { postDetailActions } from "../constants";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
export const FetchPostDetailRequest = (id, email, isShowModal) => {
  const taskURI = `/articles/${id}/${email}`;
  return async (dispatch) => {
    axios
      .get(taskURI, {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "secure_token"
          )}`,
        },
      })
      .then((result) => {
        const showingPost = {
          postDetail: result.data.articleTmp,
          isShowModal,
          isShowCommentModal: false,
        };
        dispatch(FetchPostDetailSuccess(showingPost));
      })
      .catch((error) => {
        dispatch(FetchPostDetailFailure(error));
      });
  };
};
export const closePostDetailModal = () => {
  return {
    type: postDetailActions.CLOSE_POST_DETAIL_MODAL,
  };
};
export const openCommentModal = () => {
  return {
    type: postDetailActions.OPEN_COMMENTS_MODAL,
  };
};
export const closeCommentModal = () => {
  return {
    type: postDetailActions.CLOSE_COMMENTS_MODAL,
  };
};
const FetchDefaultState = () => {
  return {
    type: postDetailActions.FETCH_POST_DETAIL_REQUEST,
  };
};
export const FetchPostDetailFailure = (error) => {
  return {
    type: postDetailActions.FETCH_POST_DETAIL_FAILURE,
    error,
  };
};
export const FetchPostDetailSuccess = (showingPost) => {
  return {
    type: postDetailActions.FETCH_POST_DETAIL_SUCCESS,
    payload: showingPost,
  };
};
