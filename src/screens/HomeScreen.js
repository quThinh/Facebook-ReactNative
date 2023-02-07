import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchPostsRequest } from "../../actions/postsAction";
import { LoginRequest } from "../../actions/userActions";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { Dimensions } from "react-native";
import RecommendFriends from "../../components/RecommendFriends";
import Item from "../../components/Item";
import PostTool from "../../components/PostTool";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    }
    this._onRefresh = () => {
      console.log("hello")
      this.setState({ refreshing: true });
      this.componentDidMount().then(() => {
        this.setState({ refreshing: false });
      });
    };
  }
  async componentDidMount() {
    const { fetchPosts, postLogin } = this.props;
    fetchPosts();
    postLogin();
  }
  render() {
    const { navigation } = this.props;
    let { posts } = this.props;
    // posts = posts.article;
    // if (posts || posts?.articleData?.length === 0) return <View></View>;
    return (
      <View>
        <ScrollView style={styles.listContainter} refreshControl={
          <RefreshControl refreshing={this.state.refreshing}
            onRefresh={this._onRefresh} />
        }>
          <PostTool></PostTool>
          {/* <Stories></Stories> */}
          <View>
            {posts?.articleData?.map((item, index) => (
              <View key={index}>
                {index === 1 && <RecommendFriends></RecommendFriends>}
                <Item item={item} key={index}></Item>
              </View>
            ))}
          </View>

        </ScrollView>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPosts: () => dispatch(FetchPostsRequest()),
    postLogin: () => dispatch(LoginRequest()),
  };
};
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
const screenHeight = Math.round(Dimensions.get("window").height);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  countTxt: {
    fontSize: 200,
    textAlign: "center",
    lineHeight: screenHeight - 170,
    width: "100%",
    height: screenHeight - 170,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "black",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    lineHeight: 50,
  },
});
