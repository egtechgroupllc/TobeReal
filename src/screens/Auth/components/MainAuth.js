import React from 'react';
import {StyleSheet, View} from 'react-native';

import Wrapper from './Wrapper';
import {MainWrapper} from '~components';
import {scale} from '~/utils/scale';

export default function MainAuth({children, heading, subHeading, style}) {
  return (
    <MainWrapper
      styleContent={{
        paddingHorizontal: scale(12),
        alignItems: 'center',
      }}>
      <View style={[styles.config, style]}>
        <Wrapper Heading1={heading} subHeading={subHeading} />
      </View>
      {children}
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  config: {
    flexDirection: 'row',
    marginTop: scale(90),
    alignItems: 'center',
    flex: 1,
  },
});
