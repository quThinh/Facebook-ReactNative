import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class LiveStream extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> LiveStream </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
  },
});
