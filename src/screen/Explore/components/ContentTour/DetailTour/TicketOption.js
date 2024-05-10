import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
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
import {TabSelect} from '../../../../../components';
import ChooseCalendar from '../../FindAccommodation/ChooseCalendar';
import {IconCalendar, IconRefund} from '../../../../../assets/icon/Icon';
import Button from '../../../../Profile/components/Button';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getListTicket} from '../../../../../Model/api/apiTour';

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
export default function TicketOption() {
  const params = useRoute().params;

  const {data, isLoading} = useQuery({
    queryKey: ['tour', 'detail', 'list-ticket', params?.id],
    queryFn: () => getListTicket(params?.id),
  });
  const {t} = useLanguage();
  const {isFocused, dispatch} = useNavigation();
  // const navigation = useNavigation();
  const booktour = item => {
    if (isFocused()) {
      dispatch(
        StackActions.push('NoBottomTab', {
          screen: 'BookTourScreen',
          params: {...item, images: params?.images},
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
        <View style={{width: '90%', alignSelf: 'center', marginTop: scale(10)}}>
          <ChooseCalendar />
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data?.data}
          contentContainerStyle={styles.content}
          style={{alignSelf: 'center', width: '100%'}}
          renderItem={({item}) => (
            <View style={styles.boxItem}>
              <TouchableOpacity
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
                  style={{...styles.text, paddingHorizontal: scale(10)}}>
                  {item.name}
                </CustomText>

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
              </TouchableOpacity>
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
                    {t('easy_reschdule')}
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
                    $ {item.price}
                  </CustomText>
                </View>
                <View style={{flexDirection: 'row', marginLeft: '25%'}}>
                  <View style={styles.discount}>
                    <CustomText
                      textType="semiBold"
                      style={{...styles.text1, color: COLORS.primary}}>
                      -25%
                    </CustomText>
                  </View>
                </View>
              </View>
              <Button
                title={t('select_ticket')}
                onPress={() => booktour(item)}
              />
            </View>
          )}
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
