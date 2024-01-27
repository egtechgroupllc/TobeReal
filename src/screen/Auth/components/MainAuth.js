import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES, images, scale} from '../../../assets/constants';
import Content from '../Register/components/Content';
import Wrapper from './Wrapper';
import {IconHi} from '../../../assets/icon/Icon';
import MainWrapper from '../../../components/MainWrapper';

export default function MainAuth({children, heading, subHeading}) {
  return (
    <MainWrapper>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: scale(50),
            alignItems: 'center',
            flex: 1,
          }}>
          <Wrapper Heading1={heading} subHeading={subHeading} />
        </View>
        {children}
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '85%',
    alignSelf: 'center',
  },
});
