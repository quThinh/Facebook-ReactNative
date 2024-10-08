import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import ScaledImage from "../ScaledImage";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as navigation from "../../rootNavigation";
import { permission } from "../../constants";
import { connect } from "react-redux";
import { beautifulDate } from "../../utils";
class Item extends Component {
  constructor(props) {
    super(props);
  }
  onPressHandle() {
    const { comments } = this.props.item;
    navigation.navigate("Comments", {
      comments,
    });
  }
  onPressPostOptionsIconHandler() {
    const { item } = this.props;
    navigation.navigate("PostOptions", {
      postDetail: item,
    });
  }
  onPressPostImageHandler(id, email) {
    navigation.navigate("PostDetail", {
      id,
      email,
    });
  }
  onPressShareHandler() {
    const { item } = this.props;
    navigation.navigate("SharePost", {
      id: item.id,
    });
  }
  onPressProfileHandler(emailID) {
    const { user } = this.props;
    if (emailID === user.email) {
      return navigation.navigate("Profile");
    }
    navigation.push("ProfileX", {
      emailID,
    });
  }
  render() {
    const { user, item } = this.props;
    return (
      <View style={styles.item}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.customListView}>
            <Image
              style={styles.avatar}
              source={{
                uri: item.User?.avatar_url
                  ? item.User?.avatar_url
                  : "https://picsum.photos/id/237/200/300",
              }}
            ></Image>
            <View style={styles.infoWrapper}>
              <View style={styles.namesWrapper}>
                <TouchableOpacity
                  onPress={this.onPressProfileHandler.bind(
                    this,
                    item.User?.email
                  )}
                >
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    {(item.User?.first_name && item.User?.first_name) ||
                      "Quang Thịnh"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.extraInfoWrapper}>
                <Text style={{ color: "#333", fontSize: 14 }}>
                  {beautifulDate(String(item.create_at))}
                </Text>
                <Text style={{ fontSize: 16, marginHorizontal: 5 }}>·</Text>
                {item.permission == permission.PUBLIC && (
                  <Icon color="#333" name="globe-asia" />
                )}
                {item.permission == permission.SETTING && (
                  <Icon color="#333" name="cogs" />
                )}
                {item.permission == permission.GROUP && (
                  <Icon color="#333" name="newspaper" />
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={this.onPressPostOptionsIconHandler.bind(this)}
            style={{ width: 25, alignItems: "center" }}
          >
            <Icon name="ellipsis-h" color="#000"></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.paragraph}>{item.content}</Text>
        </View>
        <TouchableOpacity
          onPress={this.onPressPostImageHandler.bind(
            this,
            item.id,
            item.User.email
          )}
        >
          <View style={styles.imageContainer}>
            <ScaledImage
              height={300}
              source={
                item?.image ? item?.image : "https://picsum.photos/200/300"
              }
            ></ScaledImage>
          </View>
        </TouchableOpacity>
        <View horizontal={true} style={styles.reactionContainer}>
          <TouchableOpacity>
            <Icon
              name="thumbs-up"
              color="#318bfb"
              backgroundColor="#fff"
              style={styles.reactionIcon}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="heart"
              color="#e8304a"
              backgroundColor="white"
              style={styles.reactionIcon}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="grin-squint"
              color="#f7ca51"
              backgroundColor="white"
              style={styles.reactionIcon}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressHandle.bind(this)}>
            <Icon
              lineBreakMode={false}
              name="comment-alt"
              color="gray"
              backgroundColor="white"
              style={{ ...styles.reactionIcon, fontSize: 14 }}
            >
              <Text style={{ fontSize: 12 }}>
                {" "}
                {item?.comments?.length} comments
              </Text>
            </Icon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onPressShareHandler.bind(this)}
            style={styles.shareIcon}
          >
            <Icon name="share-alt" color="gray">
              <Text style={{ fontSize: 12, textAlignVertical: "center" }}>
                {" "}
                Share
              </Text>
            </Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.commentContainer}>
          <Image
            source={{ uri: user.avatar_url }}
            style={styles.commentAvatar}
          ></Image>
          <View style={styles.commentInput}>
            <TouchableOpacity
              onPress={this.onPressHandle.bind(this)}
              style={styles.commentInputWrapper}
            >
              <Text>Comment...</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Icon
              style={styles.btnSendComment}
              name="paper-plane"
              color="gray"
            ></Icon>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};
export default connect(mapStateToProps, null)(Item);
const screenWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
  customListView: {
    padding: 15,
    width: screenWidth - 40,
    flexDirection: "row",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  infoWrapper: {
    marginLeft: 8,
  },
  namesWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  extraInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { height: 0, width: 0 },
    marginBottom: 10,
  },
  commentInputWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  paragraph: {},
  contentContainer: {
    paddingHorizontal: 15,
  },
  imageContainer: {
    marginTop: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  reactionContainer: {
    position: "relative",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  reactionIcon: {
    fontSize: 20,
    padding: 10,
  },
  shareIcon: {
    position: "absolute",
    fontSize: 14,
    padding: 10,
    right: 0,
  },
  commentContainer: {
    flexDirection: "row",
    padding: 10,
    borderColor: "red",
    borderStyle: "dashed",
    flexWrap: "nowrap",
  },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  commentInput: {
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 20,
    marginLeft: 10,
    height: 30,
    width: screenWidth - 15 * 2 - 60,
  },
  btnSendComment: {
    width: 30,
    height: 30,
    textAlign: "center",
    lineHeight: 30,
  },
});
