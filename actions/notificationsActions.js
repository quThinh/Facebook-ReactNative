import { notificationsActions } from "../constants";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
export const FetchNotificationsRequest = () => {
  const taskURI = "/notifications";
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
        const notifications = result.data.notifications;
        dispatch(FetchNotificationsSuccess(notifications));
      })
      .catch((error) => {
        dispatch(FetchNotificationsFailure(error));
      });
  };
};
const FetchDefaultState = () => {
  return {
    type: notificationsActions.FETCH_NOTIFICATIONS_REQUEST,
  };
};
export const FetchNotificationsFailure = (error) => {
  return {
    type: notificationsActions.FETCH_NOTIFICATIONS_FAILURE,
    error,
  };
};
export const FetchNotificationsSuccess = (notifications) => {
  return {
    type: notificationsActions.FETCH_NOTIFICATIONS_SUCCESS,
    payload: notifications,
  };
};
