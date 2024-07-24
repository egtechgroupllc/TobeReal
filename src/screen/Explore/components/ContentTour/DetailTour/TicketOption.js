import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import CustomText from '../../../../../components/CustomText';
import {
  COLORS,
  SIZES,
  WIDTH,
  images,
  scale,
} from '../../../../../assets/constants';

import {useLanguage} from '../../../../../hooks/useLanguage';
import BottomSheet from '../../../../../components/BottomSheet';
import WrapperContent from '../../WrapperContent';
import {CustomButton, TabSelect} from '../../../../../components';
import ChooseCalendar from '../../FindAccommodation/ChooseCalendar';
import {IconCalendar, IconRefund} from '../../../../../assets/icon/Icon';
import Button from '../../../../Profile/components/Button';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {
  getListTicket,
  getListTicketDate,
} from '../../../../../Model/api/apiTour';
import {showMess} from '../../../../../assets/constants/Helper';
import ChooseCalendarRoom from '../../DetailAccommodation/Rooms/ChooseCalendarRoom';
import {formatDate, formatPrice} from '../../../../../utils/format';
import {useCountry} from '../../../../../hooks/useCountry';

const data = [
  {
    id: 1,
    title:
      'Open trip with round trip transfer - Departure from Phuket (Thai Citizens)',
    price: '56',
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
  {
    id: 2,
    title: 'Open trip with',
    price: '56',
    imgdetail: [images.tourthailand, images.tourbali, images.toursingapore],
  },
];
export default function TicketOption({paramsTour}) {
  const [date, setDate] = useState();
  const params = useRoute().params;
  const {currency} = useCountry();
  const {data, isLoading} = useQuery({
    queryKey: [
      'tour',
      'detail',
      'list-ticket',
      params?.id,
      date?.selectedStartDate,
    ],
    queryFn: () =>
      getListTicket({
        id_tour: params?.id || params?.data?.tour?.id,
        date_end: formatDate(date?.selectedStartDate, {addDays: 1}),
        date_start: formatDate(date?.selectedStartDate),
      }),
  });

  const dataListTicket = useQuery({
    queryKey: ['tour', 'list-ticket-date', data?.id],
    queryFn: () =>
      getListTicketDate({
        id_ticket: data?.id,
        date_end: formatDate(),
        date_start: formatDate(),
      }),
  });
  const {t} = useLanguage();
  const {isFocused, dispatch} = useNavigation();
  // const navigation = useNavigation();
  const booktour = item => {
    if (isFocused()) {
      dispatch(
        StackActions.push('NoBottomTab', {
          screen: 'BookTourScreen',
          params: {
            ...item,
            images: params?.images || params?.data?.tour?.images,
          },
        }),
      );
    }
  };
  return (
    <View>
      <View style={styles.boxTourTime}>
        <CustomText
          textType="semiBold"
          style={{...styles.name, paddingHorizontal: scale(20)}}>
          {t('ticket_option')}
        </CustomText>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: scale(10),
          }}>
          <ChooseCalendarRoom
            isOneDay
            onSelectDate={value => {
              setDate(value);
            }}
            data={data}
          />
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data?.data?.rows}
          contentContainerStyle={styles.content}
          style={{alignSelf: 'center', width: '100%'}}
          renderItem={({item}) => {
            const resultPercent = item?.tour_ticket_items?.map(item => {
              return item?.price_percent;
            });
            const resultPrice = item?.tour_ticket_dates?.map(item => {
              return item?.price;
            });
            const minPercent = Math.min(...resultPercent);
            const minPrice = Math.min(...resultPrice);

            return (
              <View style={styles.boxItem}>
                <CustomText
                  textType="semiBold"
                  style={{...styles.text, paddingHorizontal: scale(10)}}>
                  {item.name}
                </CustomText>
                {/* <TouchableOpacity
                  onPress={() => {
                    if (isFocused()) {
                      dispatch(
                        StackActions.push('NoBottomTab', {
                          screen: 'DetailTicketScreen',
                          params: {...item, images: params?.images},
                        }),
                      );
                    }
                  }}>
                  <CustomText
                    textType="semiBold"
                    style={{
                      ...styles.text,
                      paddingHorizontal: scale(10),
                      marginTop: scale(5),
                      color: COLORS.primary,
                    }}>
                    {t('see_detail')}
                  </CustomText>
                </TouchableOpacity> */}
                <View style={styles.line}></View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: scale(10),
                    paddingVertical: scale(10),
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <IconRefund width={scale(15)} height={scale(15)} />
                    <CustomText
                      textType="semiBold"
                      style={{...styles.text, paddingHorizontal: scale(10)}}>
                      {t('easy_refund')}
                    </CustomText>
                  </View>
                  <View style={{flexDirection: 'row', marginLeft: '10%'}}>
                    <IconCalendar width={scale(15)} height={scale(15)} />
                    <CustomText
                      textType="semiBold"
                      style={{...styles.text, paddingHorizontal: scale(10)}}>
                      {t('easy_reschedule')}
                    </CustomText>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <CustomText
                      textType="semiBold"
                      style={{
                        ...styles.text,
                        paddingHorizontal: scale(10),
                        color: COLORS.primary,
                      }}>
                      {formatPrice(minPercent * minPrice, {
                        currency: currency?.currency_code,
                      })}
                    </CustomText>
                  </View>
                  {/* <View style={{flexDirection: 'row', marginLeft: '25%'}}>
                    <View style={styles.discount}>
                      <CustomText
                        textType="semiBold"
                        style={{...styles.text1, color: COLORS.primary}}>
                        -25%
                      </CustomText>
                    </View>
                  </View> */}
                </View>
                <CustomButton
                  text={t('select_ticket')}
                  buttonType="small"
                  styleWrapper={{
                    width: '60%',
                    alignSelf: 'center',
                    marginTop: scale(10),
                  }}
                  onPress={() => booktour(item)}
                  // onPress={() => showMess(t('comming_soon'), 'error')}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  introduction: {
    // backgroundColor: '#ccc',
    width: WIDTH.widthContain,
    rowGap: scale(10),
  },
  textIntroduction: {
    fontSize: SIZES.medium,
  },
  textSubIntroduction: {
    fontSize: SIZES.xMedium,
  },
  boxTourTime: {
    backgroundColor: COLORS.white,
    minHeight: scale(50),
    paddingVertical: scale(20),
  },
  name: {flex: 1, fontSize: SIZES.xMedium},
  text: {fontSize: SIZES.small},
  text1: {fontSize: SIZES.xSmall},
  content: {
    width: '90%',
    alignSelf: 'center',
  },
  discount: {
    backgroundColor: '#FF00001A',
    height: scale(15),
    width: '35%',
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: '95%',
    height: scale(1),
    backgroundColor: COLORS.grey,
    alignSelf: 'center',
    marginTop: scale(10),
  },
  boxItem: {
    borderWidth: scale(1),
    borderColor: '#C7C7C7',
    minHeight: scale(112),
    width: '100%',
    borderRadius: scale(10),
    paddingVertical: scale(10),
    paddingBottom: scale(20),
    marginTop: scale(10),
  },
});
