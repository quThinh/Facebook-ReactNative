import React from 'react';
import {View, Text} from 'react-native';
 
const MessageBubble = (props) => {
  return (
    <View style={{alignSelf: props.isReceived ? 'flex-start' : 'flex-end'}}>
      <View style={{backgroundColor: 'lightgrey', padding: 10}}>
        <Text>{props.text}</Text>
      </View>
    </View>
  );
};
 
export default MessageBubble;