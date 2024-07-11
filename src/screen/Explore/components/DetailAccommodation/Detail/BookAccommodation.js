/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {memo, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import {CustomButton} from '../../../../../components';
import CustomText from '../../../../../components/CustomText';
import {useAuthentication} from '../../../../../hooks/useAuthentication';
import {formatDate, formatPrice} from '../../../../../utils/format';
import {useCountry} from '../../../../../hooks/useCountry';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {useQuery} from '@tanstack/react-query';
import {getListRoomDetailAccmo} from '../../../../../Model/api/apiAccom';

export default memo(function BookAccommodation({data}) {
  const {t} = useLanguage();

  const {navigate} = useNavigation();
  const params = useRoute().params;

  const {currency} = useCountry();
  const {data: dataQ} = useQuery({
    queryKey: ['accommodation', 'detail', 'list-room', data?.id],
    queryFn: () =>
      getListRoomDetailAccmo({
        id_accomo: data?.id,
        date_end: formatDate(new Date(), {addDays: 1}),
        date_start: formatDate(new Date()),
        number_room: 1,
        number_occupancy: 1,
      }),
    enabled: !params?.isVideo,
  });

  const priceFinal = useMemo(() => {
    const dataRoom = dataQ?.data || data?.rooms;

    if (dataRoom?.length > 0) {
      const resultPri = dataRoom?.map(element => {
        const result = element?.room_dates
          .slice(0, element?.room_dates.length - 1)
          .map(room => {
            const resultPolicy = element?.accommodation_policies.reduce(
              (acc, policy) => {
                return (
                  policy?.price_percent * (room?.price_final || room?.price)
                );
              },
              0,
            );

            return resultPolicy;
          });

        return Math.min(...result);
      });
      return Math.min(...resultPri);
    }
  }, [data?.rooms, dataQ?.data]);

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          rowGap: scale(2),
        }}>
        {priceFinal && <CustomText>{t('price_only_from')}:</CustomText>}
        <CustomText
          textType="bold"
          style={{
            fontSize: SIZES.xMedium,
            color: COLORS.primary,
          }}>
          {priceFinal
            ? formatPrice(params?.priceFinal || priceFinal, {
                currency: currency?.currency_code,
              })
            : `${t('no_more_room_today')}`}
        </CustomText>
      </View>
      <CustomButton
        onPress={() => {
          navigate('RoomScreen', data);
        }}
        buttonType="medium"
        style={{flex: 0.7}}
        text={t('view_room')}
        styleText={{
          fontSize: SIZES.xMedium,
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    columnGap: scale(20),
    paddingVertical: scale(8),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
