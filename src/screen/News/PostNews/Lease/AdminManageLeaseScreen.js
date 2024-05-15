import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
import MainWrapper from '../../../../components/MainWrapper';
import {CustomButton} from '../../../../components';

export default function AdminManageLeaseScreen() {
  const params = useRoute().params;
  const {setOptions} = useNavigation();
  const {navigate} = useNavigation();
  const [adminScreen, setAdminScreen] = useState(false);
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: 'Quản lý chỗ ở',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  useEffect(() => {
    setAdminScreen(true);
  }, [adminScreen]);
  return (
    <MainWrapper
      scrollEnabled={false}
      refreshControl
      styleContent={{
        marginVertical: scale(10),
      }}>
      <View style={{alignItems: 'center', rowGap: scale(10)}}>
        <CustomText textType="semiBold" style={{fontSize: SIZES.large}}>
          {params?.name}
        </CustomText>
        <CustomImage
          source={params?.images[0]?.url}
          style={{
            borderRadius: scale(7),
            minHeight: scale(180),
            width: scale(450 / 1.4),
          }}>
          <View style={styles.type}>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.error,
              }}>
              {params?.accommodation_type?.name}
            </CustomText>
          </View>
          <View
            style={{
              ...styles.type,
              left: scale(8),
              right: 'auto',
              borderRadius: scale(5),
              paddingVertical: scale(5),
              backgroundColor:
                params?.status === 'VERIFIED'
                  ? '#42b00b'
                  : params?.status === 'VERIFYING'
                  ? COLORS.primary
                  : '#e03c31',
            }}>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.white,
              }}>
              {params?.status}
            </CustomText>
          </View>
          <View style={{...styles.content}}>
            <CustomText
              textType="bold"
              numberOfLines={2}
              style={{
                color: COLORS.white,
                fontSize: SIZES.xSmall,
              }}>
              {params?.address}
            </CustomText>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.white,
                fontSize: SIZES.xSmall,
              }}>
              RegID: {params?.id}
            </CustomText>
          </View>
        </CustomImage>
        <CustomButton
          text="Booking Count"
          style={{width: '85%', height: scale(45)}}
        />
        <CustomButton
          text="Reviews"
          style={{width: '85%', height: scale(45)}}
        />
        <CustomButton
          text="Room management"
          style={{width: '85%', height: scale(45)}}
          // onPress={() =>
          //   navigate('AddRoomTypeScreen', {...params, admin: adminScreen})
          // }
          onPress={() =>
            navigate('RoomManageScreen', {...params, admin: adminScreen})
          }
        />
        <CustomButton
          text="Policy management"
          style={{width: '85%', height: scale(45)}}
          onPress={() =>
            navigate('PolicyManageScreen', {...params, admin: adminScreen})
          }
        />
      </View>
    </MainWrapper>
  );
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: scale(10),
    rowGap: scale(3),
  },
  type: {
    position: 'absolute',
    zIndex: 1,
    right: scale(8),
    top: scale(6),
    backgroundColor: COLORS.white,
    borderRadius: 99,
    paddingHorizontal: scale(15),
    paddingVertical: scale(5),
  },
  bottom: {
    // backgroundColor: COLORS.white,
    // flexDirection: 'row',
    width: '50%',
    padding: scale(8),
    alignSelf: 'center',
    marginTop: 'auto',
    columnGap: scale(4),
    // justifyContent: 'space-between',
  },
  btnInfo: {
    height: scale(26),
    minWidth: scale(150),
    maxWidth: scale(260),
    paddingHorizontal: scale(6),
  },
  continue: {
    height: scale(26),
    borderWidth: 0,
    minWidth: scale(80),
    columnGap: scale(4),
    paddingHorizontal: 0,
  },
  iconCon: {
    color: COLORS.primary,
    width: scale(8),
    height: scale(8),
    marginTop: scale(1),
  },
});
