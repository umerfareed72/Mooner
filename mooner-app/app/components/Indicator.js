import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
class Indicator extends Component {
  state = {};
  render() {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
}

export default Indicator;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
});
