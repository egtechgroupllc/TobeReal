import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconEditProfile, IconTrash} from '../../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../../components';
import CustomImage from '../../../../../../components/CustomImage';
import CustomText from '../../../../../../components/CustomText';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../../assets/constants';
import {useQuery} from '@tanstack/react-query';
import {
  getListTicket,
  getListTicketDate,
} from '../../../../../../Model/api/apiTour';
import {formatDate, formatPrice} from '../../../../../../utils/format';
import {useCountry} from '../../../../../../hooks/useCountry';
import {useLanguage} from '../../../../../../hooks/useLanguage';
export default function TicketTypeItem({
  data,
  isTour,
  onPressMore,
  onEdit,
  onManage,
  priceFinal,
}) {
  const {navigate} = useNavigation();
  const handleContinue = () => {
    navigate(isTour ? 'AddTicketScreen' : 'AddRoomTypeScreen', data);
  };
  const {t} = useLanguage();
  const params = useRoute().params;

  const {currency} = useCountry();
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
    navigate('DetailRoomManageScreen', {...data});
  };

  //   const priceFinal = useMemo(() => {
  //     if (data?.tour_ticket_items) {
  //       const resultPri = data?.tour_ticket_items?.map(element => {
  //         return element?.price_percent * dataPriceEx;
  //       });

  //       return Math.min(...resultPri);
  //     }
  //   }, [data?.tour_ticket_items, dataPriceEx]);

  return (
    <View
      activeOpacity={0.7}
      onPress={() => {
        handleTouch();
      }}>
      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          borderRadius: scale(10),
          ...SHADOW,
        }}>
        <View style={styles.content}>
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.xlSmall,
            }}>
            {t('ticket_type_id')}: {data?.id}
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <CustomText textType="semiBold" style={{}} numberOfLines={2}>
              {data?.name}
            </CustomText>
          </View>

          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.xSmall,
            }}>
            {data?.description}
          </CustomText>
          <CustomText
            textType="semiBold"
            style={{
              color: COLORS.primary,
              fontSize: SIZES.medium,
            }}>
            {formatPrice(priceFinal, {currency: currency?.currency_code})}
          </CustomText>
        </View>

        <View style={styles.bottom}>
          <View />
          <View style={{flexDirection: 'row', columnGap: scale(10)}}>
            {/* <TouchableOpacity
              style={{
                ...styles.box,
                padding: 2,
              }}
              activeOpacity={0.7}
              onPress={onEdit}>
              <IconEditProfile
                style={{
                  width: scale(20),
                  height: scale(20),
                }}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              style={{...styles.box, padding: 2}}
              activeOpacity={0.7}
              onPress={onPressMore}>
              <IconTrash
                style={{
                  width: scale(20),
                  height: scale(20),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: scale(10),
    rowGap: scale(3),
  },
  box: {
    borderRadius: scale(4),
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    backgroundColor: COLORS.white,
    borderColor: '#ccc',
    flexDirection: 'row',
    columnGap: scale(2),
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
    flexDirection: 'row',
    // width: '50%',
    alignItems: 'center',
    padding: scale(2),
    // justifyContent: 'center',
    marginTop: 'auto',
    columnGap: scale(4),
    justifyContent: 'space-between',
  },
  btnInfo: {
    height: scale(26),
    minWidth: scale(150),
    maxWidth: scale(260),
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
