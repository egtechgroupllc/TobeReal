import {ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {images, scale} from '../assets/constants';

export default function MainAuth({children}) {
  return (
    <ImageBackground source={images.background} resizeMode='stretch' style={{flex:1}}>
    <View style={styles.wrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View>{children}</View>
      </ScrollView>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // maxWidth: scale(400),
    // alignSelf: 'center',
  },
});
