import { combineReducers } from "redux";
import storiesReducer from "./storiesReducer";
import userReducer from "./userReducer";
import postsReducer from "./postsReducer";
import showingStoryReducer from "./showingStoryReducer";
import postDetailReducer from "./postDetailReducer";
import recommendFriendsReducer from "./friendsReducer";
import bgColorsReducer from "./bgColorsReducer";
import systemImagesReducer from "./systemImagesReducer";
import historyReducer from "./historyReducer";
import userXreducer from "./userXreducer";
import notificationsReducer from "./notificationsReducer";
import searchResultReducer from "./searchResultReducer";
const rootReducer = combineReducers({
  stories: storiesReducer,
  user: userReducer,
  posts: postsReducer,
  showingStory: showingStoryReducer,
  showingPost: postDetailReducer,
  friends: recommendFriendsReducer,
  bgColors: bgColorsReducer,
  systemImages: systemImagesReducer,
  history: historyReducer,
  userX: userXreducer,
  notifications: notificationsReducer,
  searchResult: searchResultReducer,
});
export default rootReducer;
