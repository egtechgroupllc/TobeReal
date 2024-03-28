import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {getMyListCreateTour} from '../../../../Model/api/apiTour';
import {COLORS, SHADOW, scale} from '../../../../assets/constants';
import {IconAdd, IconArrowRight} from '../../../../assets/icon/Icon';
import {CustomButton} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import MainWrapper from '../../../../components/MainWrapper';
import ListCreateAccom from '../Lease/components/HomeLease/ListCreateAccom';
const list = [
  {
    title: 'I already have a property registered',
    desc: 'View and manage your registered properties',
    textBtn: 'Continue',
    navigate: 'NoBottomTab',
    screen: 'AccommoManagementScreen',
  },
  {
    title: 'Tôi muốn đăng ký tour mới',
    desc: "We're happy to hear that! Click the button below to begin listing your new accommodation. The registration process may take up to 15 minutes.",
    textBtn: 'List New Accommodation',
    navigate: 'PostNewTourScreen',
  },
];
export default function TourScreen() {
  const {navigate} = useNavigation();

  const {isLoading, isError, isFetching, data} = useQuery({
    queryKey: ['tour', 'my-list', 0],
    queryFn: () => getMyListCreateTour({hasRoom: 0}),
  });

  return (
    <MainWrapper>
      <ListCreateAccom data={data?.data} />

      <View style={styles.content}>
        {list.map((item, index) => (
          <View style={styles.box} key={index}>
            <CustomText textType="bold">{item.title}</CustomText>
            <CustomText textType="regular">{item.desc}</CustomText>

            <CustomButton
              text={item.textBtn}
              iconRight={item.textBtn === 'Continue' ? IconArrowRight : IconAdd}
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
