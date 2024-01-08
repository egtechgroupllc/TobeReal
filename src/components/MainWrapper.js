import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from '../assets/constants';

export default function MainWrapper({children}) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View>{children}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // maxWidth: scale(400),
    alignSelf: 'center',
  },
});
