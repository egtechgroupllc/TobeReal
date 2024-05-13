import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';

import {StyleSheet, View} from 'react-native';
import {COLORS, SHADOW, scale} from '../../../../assets/constants';
import {IconAdd, IconArrowRight} from '../../../../assets/icon/Icon';
import {CustomButton} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import MainWrapper from '../../../../components/MainWrapper';
import {useLanguage} from '../../../../hooks/useLanguage';
import ListCreateAccom from './components/HomeLease/ListCreateAccom';
import {useQuery} from '@tanstack/react-query';
import {getMyListCreateAccom} from '../../../../Model/api/apiAccom';

const list = [
  {
    title: 'I already have a property registered',
    desc: 'View and manage your registered properties',
    textBtn: 'Continue',
    navigate: 'NoBottomTab',
    screen: 'AccommoManagementScreen',
  },
  {
    title: 'I want to list a new accommodation',
    desc: "We're happy to hear that! Click the button below to begin listing your new accommodation. The registration process may take up to 15 minutes.",
    textBtn: 'List New Accommodation',
    navigate: 'PostNewLeaseScreen',
  },
];

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
      <ListCreateAccom
        keyArr={['accommodation', 'my-list', 0]}
        callFunc={getMyListCreateAccom}
        keyQuery={{hasRoom: 0}}
        // navigateAdd="AddRoomTypeScreen"
        navigateAdd="AddPolicyScreen"
        navigateDetail="DetailAccommodationScreen"
      />

      <View style={styles.content}>
        {list.map((item, index) => (
          <View style={styles.box} key={index}>
            <CustomText textType="bold">{item?.title}</CustomText>
            <CustomText textType="regular">{item?.desc}</CustomText>

            <CustomButton
              text={item?.textBtn}
              iconRight={
                item?.textBtn === 'Continue' ? IconArrowRight : IconAdd
              }
              buttonType="normal"
              styleWrapper={{
                alignSelf: 'flex-end',
              }}
              style={{
                minWidth: '40%',
              }}
              styleIcon={styles.icon}
              onPress={() => {
                navigate(
                  item?.navigate,
                  item?.screen && {
                    screen: item.screen,
                  },
                );
              }}
            />
          </View>
        ))}
      </View>
    </MainWrapper>
  );
}
const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    rowGap: scale(10),
    marginTop: scale(20),
  },
  box: {
    backgroundColor: COLORS.white,
    padding: scale(10),
    borderRadius: scale(6),
    rowGap: scale(10),
    width: '90%',
    ...SHADOW,
  },
  icon: {
    color: COLORS.white,
    width: scale(12),
    height: scale(12),
  },
});
