import React, { Component, useState } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import MessageBubble from './MessageBubble';

export default class Messenger extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messenger: [
        { id: 1, text: 'Hi! How are you today?' },
        { id: 2, text: 'I am doing good, how about you?' },
        { id: 3, text: 'I am doing great! Thanks for asking.' }
      ]
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Messenger</Text>
        </View>
        <View>
          <View style={[styles.chatBubbleContainer, this.props.position === 'right' ? styles.chatBubbleContainerRight : styles.chatBubbleContainerLeft]}>
            <Text style={[styles.chatBubble, this.props.position === 'right' ? styles.chatBubbleRight : styles.chatBubbleLeft]}>{this.props.text}</Text>
          </View>
          {/* <FlatList
            inverted
            data={this.state.messenger}
            renderItem={({ item }) => (
              <MessageBubble text={item.text} isReceived={true}/>
            )}
            keyExtractor={(item) => item.id.toString()}
          /> */}
        </View>
      </View>
    );
  }
}

class UserAvatar extends Component {
  render() {
    return (
      <View style={styles.userAvatarContainer}>
        <Image source={{ uri: this.props.image }} style={styles.avatar} />
        <Text style={styles.username}>{this.props.username}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5ddd5',
  },
  header: {
    height: 60,
    padding: 15,
    backgroundColor: '#3b5998',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyText: {
    fontSize: 16,
    color: '#333',
  },
  userAvatarContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  username: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});
