import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomImage from '../../../../../../components/CustomImage';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../../assets/constants';
import {CustomButton} from '../../../../../../components';
import {IconArrowRight, IconGoBack} from '../../../../../../assets/icon/Icon';
import CustomText from '../../../../../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../../../../hooks/useLanguage';

export default function CreateAccomItem({data, isTour}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();

  const handleContinue = () => {
    navigate(isTour ? 'AddTicketScreen' : 'AddRoomTypeScreen', data);
  };

  // const navigateDetail = () => {
  //   navigate(isTour ? 'DetailTourScreen' : 'DetailAccommodationScreen', {
  //     ...data,
  //   });
  // };
  const handleTouch = () => {
    // data?.rooms?.length <= 0 || data?.tour_tickets?.length <= 0
    //   ? handleContinue()
    //   : navigateDetail();
    // handleContinue();
    navigate('NoBottomTab', {screen: 'AdminManageLeaseScreen', params: data});
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        handleTouch();
      }}>
      <CustomImage
        source={data?.images[0]?.url}
        style={{
          borderRadius: scale(7),
          minHeight: scale(160),
          width: scale(400 / 1.4),
        }}>
        {data?.accommodation_type?.name && (
          <View style={styles.type}>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.error,
              }}>
              {data?.accommodation_type?.name}
            </CustomText>
          </View>
        )}

        {data?.status && (
          <View
            style={{
              ...styles.type,
              left: scale(8),
              right: 'auto',
              borderRadius: scale(5),
              paddingVertical: scale(2),
              backgroundColor:
                data?.status === 'VERIFIED'
                  ? '#42b00b'
                  : data?.status === 'VERIFYING'
                  ? COLORS.primary
                  : '#e03c31',
            }}>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.white,
              }}>
              {data?.status}
            </CustomText>
          </View>
        )}

        <View
          style={{
            backgroundColor: COLORS.overlay,
            flex: 1,
          }}>
          <View style={styles.content}>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.white,
              }}
              numberOfLines={2}>
              {data?.name}
            </CustomText>
            <CustomText
              numberOfLines={2}
              style={{
                color: COLORS.white,
                fontSize: SIZES.xSmall,
              }}>
              {data?.address}
            </CustomText>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.white,
                fontSize: SIZES.xSmall,
              }}>
              Id: {data?.id}
            </CustomText>
          </View>

          {/* <View style={styles.bottom}>
            <CustomButton
              text={
                !data?.rooms?.length <= 0 || !data?.tour_tickets?.length <= 0
                  ? isTour
                    ? 'Thêm Vé'
                    : 'Add Room'
                  : 'Incomplete Property Information'
              }
              buttonType="normal"
              style={styles.btnInfo}
              styleText={{
                fontSize: SIZES.xSmall,
              }}
              onPress={handleContinue}
            />

            <CustomButton
              text="Continue"
              buttonType="normal"
              style={styles.continue}
              outline
              iconRight={IconArrowRight}
              styleIcon={styles.iconCon}
              styleText={{
                fontSize: SIZES.xSmall,
              }}
              onPress={handleContinue}
            />
          </View> */}
          <View style={styles.bottom}>
            <CustomButton
              buttonType="normal"
              text={t('manage')}
              style={styles.btnInfo}
              styleText={{
                fontSize: SIZES.xSmall,
              }}
              onPress={handleTouch}
            />
          </View>
        </View>
      </CustomImage>
    </TouchableOpacity>
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
    paddingHorizontal: scale(6),
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
