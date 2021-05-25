import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';

const SafeWrapper = ({style, color, children}) => {
  return (
    <>
      <SafeAreaView style={{backgroundColor: color || '#fff'}} />
      <SafeAreaView
        style={{backgroundColor: '#fff', flex: 1, position: 'relative'}}>
        {children}
      </SafeAreaView>
    </>
  );
};

export default SafeWrapper;

const styles = StyleSheet.create({});
