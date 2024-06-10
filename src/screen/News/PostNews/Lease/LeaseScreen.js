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

export default function LeaseScreen() {
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();
  const list = [
    {
      title: t('already_have_property'),
      desc: t('view_registed_properties'),
      textBtn: t('continue'),
      navigate: 'NoBottomTab',
      screen: 'AccommoManagementScreen',
    },
    {
      title: t('new_accommodation'),
      desc: t('click_button_below'),
      textBtn: t('list_new'),
      navigate: 'PostNewLeaseScreen',
    },
  ];
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('post_new'),
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
        // navigateAdd="AddPolicyScreen"
        // navigateDetail="DetailAccommodationScreen"
      />

      <View style={styles.content}>
        {list.map((item, index) => (
          <View style={styles.box} key={index}>
            <CustomText textType="bold" style={{color: COLORS.black}}>
              {item?.title}
            </CustomText>
            <CustomText textType="regular" style={{color: COLORS.black}}>
              {item?.desc}
            </CustomText>

            <CustomButton
              text={item?.textBtn}
              iconRight={
                item?.textBtn === t('continue') ? IconArrowRight : IconAdd
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
