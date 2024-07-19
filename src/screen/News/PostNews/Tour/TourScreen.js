import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {getMyListCreateTour} from '../../../../Model/api/apiTour';
import {COLORS, SHADOW, scale} from '../../../../assets/constants';
import {IconAdd, IconArrowRight} from '../../../../assets/icon/Icon';
import {CustomButton} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import MainWrapper from '../../../../components/MainWrapper';
import ListCreateAccom from '../Lease/components/HomeLease/ListCreateAccom';
import ListCreateTour from './ListCreateTour';
import {useLanguage} from '../../../../hooks/useLanguage';

export default function TourScreen() {
  const {navigate, setOptions} = useNavigation();

  const {t} = useLanguage();
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('post_new'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const list = [
    {
      title: t('already_have_tour'),
      desc: t('view_tour'),
      textBtn: t('continue'),
      navigate: 'NoBottomTab',
      screen: 'TourManagementScreen',
    },
    {
      title: t('register_new_tour'),
      desc: t('list_new_tour_registration'),
      textBtn: t('create_new_tour'),
      navigate: 'PostNewTourScreen',
    },
  ];
  return (
    <MainWrapper>
      <ListCreateTour
        keyArr={['tour', 'my-list', 0]}
        callFunc={getMyListCreateTour}
        keyQuery={{hasTicket: 0}}
        isTour
      />

      <View style={styles.content}>
        {list.map((item, index) => (
          <View style={styles.box} key={index}>
            <CustomText textType="bold">{item.title}</CustomText>
            <CustomText textType="regular">{item.desc}</CustomText>

            <CustomButton
              text={item.textBtn}
              iconRight={
                item.textBtn === t('continue') ? IconArrowRight : IconAdd
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
                  item.navigate,
                  item?.screen && {
                    screen: item.screen,
                    params: {isTour: true},
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
