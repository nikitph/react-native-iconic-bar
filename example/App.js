import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconicBar from 'react-native-iconic-bar';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Here's our progress bar. Whee!!!</Text>

        <View style={{ alignItems: 'center', margin:20 }}>
          <IconicBar progress={50} initialProgress={25} icon={"ios-car-outline"} iconColor={"green"} iconSize={40} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin:20
  }
});
