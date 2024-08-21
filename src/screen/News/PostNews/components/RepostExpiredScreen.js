import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect, useMemo} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLanguage} from '../../../../hooks/useLanguage';
import {IconHome, IconLogoSaveloka} from '../../../../assets/icon/Icon';
import {COLORS, SHADOW, SIZES, scale} from '../../../../assets/constants';
import {
  CustomButton,
  CustomImage,
  CustomText,
  MainWrapper,
} from '../../../../components';
import ContentRepost from './ContentRepost';
import {useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {postAddTicketDate} from '../../../../Model/api/apiTour';
import {showMess} from '../../../../assets/constants/Helper';
import {useCountry} from '../../../../hooks/useCountry';
import {replaceTranslateKey} from '../../../../utils/replaceTranslateKey';
import {formatDate, formatPrice} from '../../../../utils/format';
import {postAddRoomDate} from '../../../../Model/api/apiAccom';

export default function RepostExpiredScreen() {
  const {t} = useLanguage();

  const params = useRoute().params;
  const {setOptions, navigate} = useNavigation();
  const {currency} = useCountry();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: {errors},
  } = useForm();
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('repost'),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigate('POST', {screen: 'PostNewsScreen'})}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const postAddTicketDateMu = useMutation({
    mutationFn: postAddTicketDate,
  });
  const postAddRoomDateMu = useMutation({
    mutationFn: postAddRoomDate,
  });
  const handleManagePrice = value => {
    const dataTicket = {
      number_days: Number(value?.number_days),
      price: value?.price,
      currency_id: currency?.id,
    };
    const dataRoom = {
      number_days: Number(value?.number_days),
      price: value?.price,
      currency_id: currency?.id,
      number_room: value?.number_room,
    };
    const mutationConfig = {
      onSuccess: dataInside => {
        showMess(
          dataInside?.message_replacements
            ? replaceTranslateKey(
                t(dataInside?.message),
                dataInside?.message_replacements,
              )
            : t(dataInside?.message),
          dataInside?.status ? 'success' : 'error',
        );
        if (dataInside?.status) {
          if (params?.isTour) {
            navigate('NoBottomTab', {
              screen: 'TourManagementScreen',
            });
          } else {
            navigate('NoBottomTab', {
              screen: 'AccommoManagementScreen',
            });
          }
        }
      },
      onError: err => {
        console.log(err);
        showMess(t('an_error_occured'), 'error');
      },
    };
    if (params?.isTour) {
      postAddTicketDateMu.mutate(
        {
          id_ticket: params?.item?.id,
          dataTicket,
        },
        mutationConfig,
      );
    } else {
      postAddRoomDateMu.mutate(
        {
          id_room: params?.id,
          dataRoom,
        },
        mutationConfig,
      );
    }
  };

  const priceMin = useMemo(() => {
    if (params?.item?.tour_ticket_dates) {
      const result = params?.item?.tour_ticket_dates.map(item => {
        return item?.price;
      });

      return Math.min(...result);
    }
  }, [params?.item?.tour_ticket_items]);
  console.log(params?.ticketLastDate, 312312);
  return (
    <MainWrapper>
      <View style={{padding: scale(15), rowGap: scale(20)}}>
        {params?.isTour ? (
          <>
            <View style={{alignItems: 'center', marginTop: scale(30)}}>
              <IconLogoSaveloka width={scale(130)} height={scale(130)} />
            </View>

            <View style={styles.content}>
              <CustomText
                textType="semiBold"
                style={{
                  fontSize: SIZES.xSmall,
                }}>
                {t('ticket_id')}: {params?.item?.id}
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
                  {params?.item?.name}
                </CustomText>
              </View>

              <CustomText
                textType="medium"
                numberOfLines={2}
                style={{
                  fontSize: SIZES.small,
                }}>
                {params?.item?.description}
              </CustomText>

              <CustomText
                textType="bold"
                style={{
                  color: COLORS.primary,
                  fontSize: SIZES.medium,
                }}>
                {formatPrice(priceMin, {currency: currency?.currency_code})} (
                {t('list_price')})
              </CustomText>
              <CustomText
                textType="medium"
                style={{
                  color: COLORS.black + '90',
                  fontSize: SIZES.xSmall,
                  alignSelf: 'flex-end',
                }}>
                {t('date_start')} {t('repost').toLowerCase()}:{' '}
                {formatDate(params?.ticketLastDate, {addDays: 1})}
              </CustomText>
            </View>
          </>
        ) : (
          <>
            <CustomImage
              source={params?.images[0]?.url}
              style={{
                borderRadius: scale(7),
                minHeight: scale(200),
                width: '100%',
              }}>
              <View style={styles.contentItem}>
                <CustomText
                  textType="semiBold"
                  style={{
                    color: COLORS.white,
                    fontSize: SIZES.large,
                    ...SHADOW,
                  }}
                  numberOfLines={2}>
                  {params?.name}
                </CustomText>

                <CustomText
                  textType="semiBold"
                  style={{
                    color: COLORS.white,
                    fontSize: SIZES.small,
                    ...SHADOW,
                  }}>
                  {t('room')} id: {params?.id}
                </CustomText>
                <CustomText
                  textType="semiBold"
                  style={{
                    color: COLORS.white,
                    fontSize: SIZES.small,
                    ...SHADOW,
                  }}>
                  {t('acreage')}:{' '}
                  <CustomText
                    textType="semiBold"
                    style={{
                      color: COLORS.white,
                      fontSize: SIZES.xSmall,
                    }}>
                    {formatPrice(params?.size_width * params?.size_length, {
                      unit: 'm²',
                    })}
                  </CustomText>
                </CustomText>
                <CustomText
                  textType="bold"
                  style={{
                    color: COLORS.white,
                    fontSize: SIZES.xSmall,
                    ...SHADOW,
                  }}>
                  {t('date_start')} {t('repost').toLowerCase()}:{' '}
                  {formatDate(params?.roomLastDate, {addDays: 1})}
                </CustomText>
              </View>
            </CustomImage>
          </>
        )}
        <ContentRepost
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          isTour={params?.isTour}
        />
        <CustomButton
          text={t('confirm')}
          onPress={handleSubmit(handleManagePrice)}
          styleWrapper={{marginTop: scale(30)}}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: scale(10),
    rowGap: scale(5),
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    ...SHADOW,
    marginTop: '3%',
  },
  contentItem: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: scale(10),
    rowGap: scale(3),
    backgroundColor: COLORS.overlay,
  },
});
