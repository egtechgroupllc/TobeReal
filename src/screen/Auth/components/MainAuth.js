import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from '../../../assets/constants';
import MainWrapper from '../../../components/MainWrapper';
import Wrapper from './Wrapper';

export default function MainAuth({children, heading, subHeading, style}) {
  return (
    <MainWrapper>
      <View style={styles.container}>
        <View style={[styles.config, style]}>
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
  config: {
    flexDirection: 'row',
    marginTop: scale(90),
    alignItems: 'center',
    flex: 1,
  },
});
