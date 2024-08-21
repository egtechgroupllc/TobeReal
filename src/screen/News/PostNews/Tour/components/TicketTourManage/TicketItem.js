import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  IconEditProfile,
  IconReset,
  IconTrash,
} from '../../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../../components';
import CustomImage from '../../../../../../components/CustomImage';
import CustomText from '../../../../../../components/CustomText';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../../assets/constants';
import {useQuery} from '@tanstack/react-query';
import {
  getListTicket,
  getListTicketDate,
} from '../../../../../../Model/api/apiTour';
import {
  formatDate,
  formatDateTime,
  formatPrice,
} from '../../../../../../utils/format';
import {useCountry} from '../../../../../../hooks/useCountry';
import {useLanguage} from '../../../../../../hooks/useLanguage';
export default function TicketItem({
  data,
  isTour,
  onPressMore,
  onEdit,
  onManage,
  onChangePrice,
  onRepost,
  onTicketLastDate,
}) {
  const {navigate} = useNavigation();
  const handleContinue = () => {
    navigate(isTour ? 'AddTicketScreen' : 'AddRoomTypeScreen', data);
  };
  const {t} = useLanguage();
  const {currency} = useCountry();
  const today = formatDate(new Date(), {dateStyle: 'yyyy-MM-dd'});

  // const navigateDetail = () => {
  //   navigate(isTour ? 'DetailTourScreen' : 'DetailAccommodationScreen', {
  //     ...data,
  //   });
  // };
  const checkQuantity = useMemo(
    () =>
      data?.item?.tour_ticket_items?.some(item => {
        return item?.quantity_real === 0;
      }),
    [],
  );

  const handleTouch = () => {
    // data?.rooms?.length <= 0 || data?.tour_tickets?.length <= 0
    //   ? handleContinue()
    //   : navigateDetail();
    // handleContinue();
    navigate('DetailRoomManageScreen', {...data});
  };

  // const priceFinal = useMemo(() => {
  //   if (data?.item?.tour_ticket_items) {
  //     const resultPri = data?.item?.tour_ticket_items?.map(element => {
  //       return element?.price_percent * dataPriceEx;
  //     });

  //     return Math.min(...resultPri);
  //   }
  // }, [data?.tour_ticket_items, dataPriceEx]);
  const {data: dataListTicketDate, isLoading} = useQuery({
    queryKey: [
      'tour',
      'list-ticket-date',
      {
        id_ticket: data?.item?.id,
      },
    ],
    queryFn: () =>
      getListTicketDate({
        id_ticket: data?.item?.id,
      }),
  });
  const TicketLast = useMemo(() => {
    const rows = dataListTicketDate?.data?.data?.rows;
    return rows?.[rows.length - 1];
  }, [dataListTicketDate]);
  const percentMin = useMemo(() => {
    const result = data?.item?.tour_ticket_items?.map(percent => {
      return percent?.price_percent;
    });
    return Math.min(...result);
  }, [data?.item?.tour_ticket_items]);
  const priceMin = useMemo(() => {
    const result = data?.item?.tour_ticket_dates.map(item => {
      return item?.price;
    });

    return Math.min(...result);
  }, [data?.item?.tour_ticket_items]);

  const priceFinal = useMemo(() => {
    return priceMin * percentMin;
  }, [priceMin, percentMin]);
  useEffect(() => {
    onTicketLastDate && onTicketLastDate(TicketLast?.date);
  }, [TicketLast?.date, onTicketLastDate]);

  return (
    <View>
      <View
        style={{
          backgroundColor:
            today > TicketLast?.date ? COLORS.grey : COLORS.white,
          flex: 1,
          borderRadius: scale(10),
          ...SHADOW,
        }}>
        {today > TicketLast?.date && (
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              backgroundColor: COLORS.black + '80',
              rowGap: scale(20),
              borderRadius: scale(6),
            }}>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.primary,
                fontSize: SIZES.medium,
                textAlign: 'center',
                width: '80%',
              }}>
              {t('please_repost')}!
            </CustomText>
            <View style={{flexDirection: 'row', columnGap: scale(10)}}>
              <CustomButton
                onPress={onRepost}
                activeOpacity={0.9}
                text={t('repost')}
                buttonType="small"
                iconRight={IconReset}
                styleIcon={{color: COLORS.white}}
                styleWrapper={{width: '30%'}}
              />
              <TouchableOpacity
                style={{...styles.box, backgroundColor: COLORS.white}}
                activeOpacity={0.7}
                onPress={onPressMore}>
                {/* <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} /> */}
                <IconTrash
                  style={{
                    width: scale(20),
                    height: scale(20),
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.content}>
          {checkQuantity ? (
            <View
              style={{
                flexDirection: 'row',
                columnGap: scale(10),
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: COLORS.error,
                  padding: scale(5),
                  borderRadius: scale(5),
                }}>
                <CustomText
                  textType="medium"
                  numberOfLines={2}
                  style={{
                    fontSize: SIZES.xSmall,
                    color: COLORS.white,
                  }}>
                  {t('sold_out')}
                </CustomText>
              </View>
              <CustomText
                textType="medium"
                numberOfLines={2}
                style={{
                  fontSize: SIZES.xSmall,
                  color: COLORS.error,
                }}>
                {t('ticket_sold_out_create_more')}
              </CustomText>
            </View>
          ) : (
            <></>
          )}
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.xlSmall,
            }}>
            {t('ticket_id')}: {data?.item?.id}
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <CustomText
              textType="semiBold"
              style={{
                flex: 1,
              }}
              numberOfLines={2}>
              {data?.item?.name}
            </CustomText>
          </View>

          <CustomText
            textType="medium"
            numberOfLines={2}
            style={{
              fontSize: SIZES.xSmall,
            }}>
            {data?.item?.description}
          </CustomText>

          <CustomText
            textType="bold"
            style={{
              color: COLORS.primary,
              fontSize: SIZES.medium,
            }}>
            {formatPrice(priceFinal, {currency: currency?.currency_code})}
          </CustomText>
        </View>

        <View style={styles.bottom}>
          <CustomButton
            buttonType="normal"
            text={t('manage')}
            style={styles.btnInfo}
            styleText={{
              fontSize: SIZES.xSmall,
            }}
            onPress={onManage}
          />
          <CustomButton
            buttonType="normal"
            disabled={!checkQuantity ? false : true}
            text={t('price_adjustment')}
            style={{
              ...styles.btnInfo,
              backgroundColor: !checkQuantity ? COLORS.primary : COLORS.grey,
            }}
            styleText={{
              fontSize: SIZES.xSmall,
            }}
            onPress={onChangePrice}
          />
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
    rowGap: scale(5),
  },
  box: {
    borderRadius: scale(4),
    borderWidth: 1,
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
    padding: scale(8),
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 'auto',
    columnGap: scale(4),
    justifyContent: 'space-between',
  },
  btnInfo: {
    height: scale(26),
    minWidth: scale(140),
    maxWidth: scale(230),
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
