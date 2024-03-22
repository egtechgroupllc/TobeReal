import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';

import {StyleSheet, View} from 'react-native';
import {COLORS, scale} from '../../../../assets/constants';
import {IconAdd} from '../../../../assets/icon/Icon';
import {CustomButton} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import MainWrapper from '../../../../components/MainWrapper';
import {useLanguage} from '../../../../hooks/useLanguage';
import ListCreateAccom from './components/HomeLease/ListCreateAccom';

export default function LeaseScreen() {
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('Post news'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrapper>
      <ListCreateAccom />

      <View style={styles.content}>
        <View style={styles.box}>
          <CustomText textType="bold">
            I want to list a new accommodation
          </CustomText>
          <CustomText textType="regular">
            We're happy to hear that! Click the button below to begin listing
            your new accommodation. The registration process may take up to 15
            minutes.
          </CustomText>

          <CustomButton
            text="List New Accommodation"
            iconLeft={IconAdd}
            buttonType="normal"
            styleWrapper={{
              alignSelf: 'flex-end',
            }}
            style={{
              minWidth: '40%',
            }}
            styleIcon={{
              color: COLORS.white,
              width: scale(12),
              height: scale(12),
            }}
            onPress={() => navigate('PostNewLeaseScreen')}
          />
        </View>
      </View>
    </MainWrapper>
  );
}
const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    rowGap: scale(20),
    marginTop: scale(30),
  },
  box: {
    backgroundColor: COLORS.white,
    padding: scale(10),
    borderRadius: scale(6),
    rowGap: scale(10),
    width: '90%',
  },
});
