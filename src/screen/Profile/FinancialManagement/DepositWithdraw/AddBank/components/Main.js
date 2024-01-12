import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Content from './Content';



export default function Main() {
  return (
    <View style={styles.container}>
      <Content/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
  },
});
