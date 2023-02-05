import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class Messenger extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Messenger </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
  },
});
