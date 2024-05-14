import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../../../../assets/constants';
import {
  IconCalendar,
  IconClock,
  IconHome,
  IconInputDirectly,
  IconNoCalendar,
  IconPrint,
  IconRefund,
  IconRight,
  IconRoom,
} from '../../../../../../assets/icon/Icon';

import CustomText from '../../../../../../components/CustomText';

import CustomImage from '../../../../../../components/CustomImage';

import Introduction from '../../DetailTour/Introduction';
import Star from '../../../../../../components/StarRating';
import TicketOption from '../../DetailTour/TicketOption';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import TermContent from './TermContent';

export default function GeneralInformation() {
  const {t} = useLanguage();
  return (
    <View>
      <View style={styles.wrapper}>
        <View>
          <CustomText textType="semiBold" style={styles.text}>
            {t('price_include')}
          </CustomText>
          <CustomText textType="medium" style={styles.text}>
            {t('carriage')}:
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: scale(10),
              paddingTop: scale(10),
              paddingHorizontal: scale(20),
            }}>
            <View style={styles.dot}></View>
            <CustomText textType="medium" style={styles.text}>
              {t('round_trip')}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: scale(10),
              paddingHorizontal: scale(20),
              paddingBottom: scale(10),
            }}>
            <View style={styles.dot}></View>
            <CustomText textType="medium" style={styles.text}>
              {t('high_speed')}
            </CustomText>
          </View>
          <CustomText textType="medium" style={styles.text}>
            {t('tour_guide')}:
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: scale(10),
              paddingTop: scale(10),
              paddingHorizontal: scale(20),
              paddingBottom: scale(10),
            }}>
            <View style={styles.dot}></View>
            <CustomText textType="medium" style={styles.text}>
              {t('thai_english')}
            </CustomText>
          </View>
          <CustomText textType="medium" style={styles.text}>
            {t('meal')}
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: scale(10),
              columnGap: scale(10),
              paddingHorizontal: scale(20),
            }}>
            <View style={styles.dot}></View>
            <CustomText textType="medium" style={styles.text}>
              {t('light_breakfast')}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: scale(10),
              paddingHorizontal: scale(20),
              paddingBottom: scale(10),
            }}>
            <View style={styles.dot}></View>
            <CustomText textType="medium" style={styles.text}>
              {t('lunch_option')}
            </CustomText>
          </View>
          <CustomText textType="medium" style={styles.text}>
            {t('service_supple')}:
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: scale(10),
              paddingHorizontal: scale(20),
              paddingTop: scale(10),
            }}>
            <View style={styles.dot}></View>
            <CustomText textType="medium" style={styles.text}>
              {t('divine_mask')}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: scale(10),
              paddingHorizontal: scale(20),
            }}>
            <View style={styles.dot}></View>
            <CustomText textType="medium" style={styles.text}>
              {t('admission_fee')}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: scale(10),
              paddingHorizontal: scale(20),
            }}>
            <View style={styles.dot}></View>
            <CustomText textType="medium" style={styles.text}>
              {t('insurance_provide')}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: scale(10),
              paddingHorizontal: scale(20),
            }}>
            <View style={styles.dot}></View>
            <CustomText textType="medium" style={styles.text}>
              {t('soft_drink')}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: scale(10),
              paddingHorizontal: scale(20),
            }}>
            <View style={styles.dot}></View>
            <CustomText textType="medium" style={styles.text}>
              {t('seasonal_fruits')}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: scale(10),
              paddingHorizontal: scale(20),
            }}>
            <View style={styles.dot}></View>
            <CustomText textType="medium" style={styles.text}>
              {t('cake_and_snack')}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: scale(10),
              paddingHorizontal: scale(20),
            }}>
            <View style={styles.dot}></View>
            <CustomText textType="medium" style={styles.text}>
              {t('other_personal')}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: scale(10),
              paddingHorizontal: scale(20),
              paddingBottom: scale(10),
            }}>
            <View style={styles.dot}></View>
            <CustomText textType="medium" style={styles.text}>
              {t('tip')}
            </CustomText>
          </View>
        </View>
        <View>
          <CustomText textType="semiBold" style={styles.text}>
            {t('voucher_validity')}
          </CustomText>
          <View style={{flexDirection: 'row', marginTop: '2%'}}>
            <IconCalendar></IconCalendar>
            <View style={{marginLeft: '5%', marginTop: '1%'}}>
              <CustomText textType="medium" style={styles.text}>
                {t('use_selected_date')}:
              </CustomText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: scale(10),
                }}>
                <View style={{...styles.dot, width: '2.5%'}}></View>
                <CustomText textType="medium" style={styles.text}>
                  {t('valid_normally')}
                </CustomText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: scale(10),
                  paddingBottom: scale(10),
                }}>
                <View style={{...styles.dot, width: '2.5%'}}></View>
                <CustomText textType="medium" style={styles.text}>
                  {t('valid_holiday')}
                </CustomText>
              </View>
            </View>
          </View>
        </View>
        <View>
          <CustomText textType="semiBold" style={styles.text}>
            {t('conversion_method')}
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '2%',
              alignItems: 'center',
            }}>
            <IconNoCalendar />
            <View style={{marginLeft: '5%'}}>
              <CustomText textType="medium" style={styles.text}>
                {t('no_reservation')}
              </CustomText>
              <CustomText textType="medium" style={styles.text}>
                {t('do_not_need_book')}.
              </CustomText>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '2%',
              alignItems: 'center',
              paddingBottom: '2%',
            }}>
            <IconInputDirectly />
            <View style={{marginLeft: '5%'}}>
              <CustomText textType="bold" style={styles.text}>
                {t('input_directly')}
              </CustomText>
            </View>
          </View>
          <CustomText textType="regular" style={styles.text}>
            - {t('after_confirming')}.
          </CustomText>
          <CustomText textType="regular" style={styles.text}>
            - {t('when_coming')}!
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '2%',
              alignItems: 'center',
              paddingBottom: '2%',
            }}>
            <IconPrint />
            <View style={{marginLeft: '5%'}}>
              <CustomText textType="bold" style={styles.text}>
                {t('no_need_print_card')}
              </CustomText>
            </View>
          </View>
          <CustomText textType="regular" style={styles.text}>
            {t('just_present_electronic')}
          </CustomText>
        </View>
      </View>
      <TermContent />
      {/* <View style={styles.line}></View>
      <Introduction /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // width: WIDTH.widthContain,
    rowGap: scale(8),
    backgroundColor: '#fff',
    padding: scale(16),
    paddingBottom: scale(4),
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
  },
  name: {fontSize: SIZES.xMedium},
  name1: {fontSize: SIZES.xLarge},
  name2: {fontSize: SIZES.xxLarge},
  text: {fontSize: SIZES.small, color: COLORS.black},
  text1: {fontSize: SIZES.xxSmall, width: '30%'},
  line: {
    width: '100%',
    height: scale(1),
    backgroundColor: COLORS.grey,
  },
  boxTourTime: {
    backgroundColor: COLORS.white,
    minHeight: scale(50),
    paddingVertical: scale(20),
  },
  boxHot: {
    backgroundColor: '#9681fA',
    paddingHorizontal: scale(6),
    paddingVertical: scale(4),
    borderRadius: scale(6),
    maxWidth: scale(110),
  },
  discount: {
    backgroundColor: '#FF00001A',
    height: scale(20),
    width: '35%',
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  room: {
    flexDirection: 'row',
    columnGap: scale(10),
    rowGap: scale(6),
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  boxRoom: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(4),
  },
  icon: {
    width: scale(16),
    height: scale(16),
  },
  boxMore: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: scale(6),
    padding: scale(5),
    overflow: 'hidden',
  },
  rating: {
    borderWidth: 0,
    backgroundColor: '#de4e4e',
  },
  dot: {
    height: scale(4),
    backgroundColor: COLORS.black,
    borderRadius: scale(99),
    width: '1.5%',
  },
});
