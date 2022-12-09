import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import { Provider } from "react-redux";
import store from "./store";
import { Platform, LogBox } from "react-native";
import { navigationRef } from "./rootNavigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from 'axios'

import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
  StackNavigationOptions,
} from "@react-navigation/stack";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const rootStack = createStackNavigator();

import { BASE_URL, STATUSBAR_HEIGHT } from "./constants";

import HomeScreen from "./src/screens/HomeScreen";
import WatchScreen from "./src/screens/WatchTab";

import ShortCutScreen from "./src/screens/ShortCutTab";
import Comments from "./src/screens/Comments";
import CommentsPopUp from './src/screens/CommentsPopUp'
import PostDetail from './src/screens/PostDetail'
import SharePost from './src/screens/SharePost'
import StoryDetailScreen from './src/screens/StoryDetail'

import NotificationScreen from "./src/screens/NotificationTab";
import NotificationOptions from './src/screens/NotificationTab/NotificationOptions'

import ProfileScreen from "./src/screens/ProfileTab";
import ProfileX from "./src/screens/ProfileTab/ProfileX";
import ProfileSetting from "./src/screens/ProfileTab/ProfileSetting";
import ProfilePostOptions from "./src/screens/ProfileTab/ProfilePostOptions";
import EditPublicInfo from "./src/screens/ProfileTab/EditPublicInfo";
import FullFriends from "./src/screens/ProfileTab/FullFriends";
import FriendOptions from "./src/screens/ProfileTab/FriendOptions";
import AvatarOptions from "./src/screens/ProfileTab/AvatarOptions";
import FindFriends from "./src/screens/ProfileTab/FindFriends";
import FriendRequests from "./src/screens/ProfileTab/FriendRequests";

import GroupSearch from './src/screens/Search/GroupSearch'
import GroupCategory from './src/screens/GroupTab/GroupCategory'
import GroupCategories from './src/screens/GroupTab/GroupCategories'
import GroupProfile from './src/screens/GroupTab/group'
import GroupScreen from './src/screens/GroupTab'

import Search from "./src/screens/Search";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

axios.defaults.baseURL = BASE_URL

const HomeTab = () => {
  // CameraRoll.getPhotos({
  // 	first: 20,
  // 	assetType: 'Photos',
  // }).then(result => {
  // 	console.log(result)
  // })
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalSlideFromBottomIOS,
        gestureResponseDistance: 800,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />

      <Stack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="Comments" component={Comments} />
    </Stack.Navigator>
  );
};

const GroupTab = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GroupScreen" component={GroupScreen} />
    </Stack.Navigator>
  );
};
const WatchScreenWithIsFocused = (
  props: JSX.IntrinsicAttributes & { [x: string]: any }
) => {
  const isFocused = useIsFocused();
  return <WatchScreen {...props} isFocused={isFocused}></WatchScreen>;
};

const WatchTab = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WatchScreen" component={WatchScreenWithIsFocused} />
    </Stack.Navigator>
  );
};

const ProfileTab = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="ProfileScreen" component={ProfileScreen} />
		</Stack.Navigator>
	)
}

const NotificationTab = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="NotificationScreen" component={NotificationScreen} />
		</Stack.Navigator>
	)
}
const ShortCutTab = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="ShortCutIndex" component={ShortCutScreen} />
		</Stack.Navigator>
	)
}
const MainTab = () => {
  const navigationOptions = {
    tabBarStyle: {
      paddingTop: STATUSBAR_HEIGHT,
    },
    tabBarShowIcon: true,
    tabBarShowLabel: false,
  };
  return (
    <Tab.Navigator screenOptions={navigationOptions}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name="home"
              size={20}
              color={focused ? "#318bfb" : "#ddd"}
            ></Icon>
          ),
        }}
        name="Home"
        component={HomeTab}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name="users"
              size={20}
              color={focused ? "#318bfb" : "#ddd"}
            ></Icon>
          ),
        }}
        name="Group"
        component={GroupTab}
      />
      <Tab.Screen
				options={{ tabBarIcon: ({ color, focused }) => (<Icon name='video' size={20} color={focused ? '#318bfb' : '#ddd'}></Icon>) }}
				name="Watch" component={WatchTab} />
			<Tab.Screen
				options={{ tabBarIcon: ({ color, focused }) => (<Icon name='user-circle' size={22} color={focused ? '#318bfb' : '#ddd'}></Icon>) }}
				name="Profile" component={ProfileTab} />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name="bell"
              size={22}
              color={focused ? "#318bfb" : "#ddd"}
            ></Icon>
          ),
        }}
        name="Notification"
        component={NotificationTab}
      />
      <Tab.Screen
				options={{ tabBarIcon: ({ color, focused }) => (<Icon name='bars' size={20} color={focused ? '#318bfb' : '#ddd'}></Icon>) }}
				name="ShortCut" component={ShortCutTab} />
    </Tab.Navigator>
  );
};
function App() {
  const TransitionPreset =
    Platform.OS === "ios" ? TransitionPresets.ModalSlideFromBottomIOS : {};
  const navigationOptions: StackNavigationOptions = {
    headerShown: false,
    ...TransitionPreset,
    gestureResponseDistance: 800,
  };
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <rootStack.Navigator screenOptions={navigationOptions}>
          <rootStack.Screen component={MainTab} name="MainTab" />
          <rootStack.Screen name="StoryDetail" component={StoryDetailScreen} />
					<rootStack.Screen name="PostDetail" component={PostDetail} />

					{/* <rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="Marketplace" component={Marketplace} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="MarketplaceSearch" component={MarketplaceSearch} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="MarketplaceProductDetail" component={MarketplaceProductDetail} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="MarketplaceCategory" component={MarketplaceCategory} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="MarketplaceArea" component={MarketplaceArea} />

					<rootStack.Screen options={{ gestureEnabled: false }} name="Page" component={Page} />
					<rootStack.Screen options={{ gestureEnabled: true }} name="PagePostDetail" component={PagePostDetail} />

					<rootStack.Screen options={{ gestureEnabled: false }} name="PhotoChooser" component={PhotoChooser} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="Camera" component={Camera} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="Search" component={Search} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="Result" component={Result} />

					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="WatchOptions" component={WatchOptions} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="WatchSearch" component={WatchSearch} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="SeenVideos" component={SeenVideos} />
					<rootStack.Screen options={{ gestureEnabled: true }} name="WatchDetail" component={WatchDetail} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="WatchDetailList" component={WatchDetailList} /> */}



					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="ProfilePostOptions" component={ProfilePostOptions} />
					{/* <rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="EditPublicInfo" component={EditPublicInfo} /> */}
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="FullFriends" component={FullFriends} />
					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="FriendOptions" component={FriendOptions} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="FindFriends" component={FindFriends} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="FriendRequests" component={FriendRequests} />
					{/* <rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="ProfileSetting" component={ProfileSetting} /> */}
					<rootStack.Screen options={{ gestureEnabled: false }} name="ProfileX" component={ProfileX} />
					{/* <rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="AvatarOptions" component={AvatarOptions} /> */}

					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="NotificationOptions" component={NotificationOptions} />

					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="GroupCategory" component={GroupCategory} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="GroupCategories" component={GroupCategories} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="GroupSearch" component={GroupSearch} />
					<rootStack.Screen options={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }} name="GroupProfile" component={GroupProfile} />

					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="CommentsPopUp" component={CommentsPopUp} />
					<rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="SharePost" component={SharePost} />
					{/* <rootStack.Screen options={{ cardStyle: { backgroundColor: 'transparent' } }} name="PostOptions" component={PostOptions} />
					<rootStack.Screen options={{ gestureEnabled: false }} name="FullPostTool" component={FullPostTool} />
					<rootStack.Screen name="CheckIn" component={CheckIn} />
					<rootStack.Screen name="PhotoUploader" component={PhotoUploader} />
					<rootStack.Screen name="LiveStream" component={LiveStream} /> */}
        </rootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;
