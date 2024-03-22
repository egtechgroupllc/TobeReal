import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../../../../assets/constants';
import {
  IconCalendar,
  IconClock,
  IconFullyRefund,
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
import Star from '../../../../../../components/Star';
import TicketOption from '../../DetailTour/TicketOption';
import {useLanguage} from '../../../../../../hooks/useLanguage';

export default function TermContent() {
  const {t} = useLanguage();
  const [changeVote, setChangeVote] = useState(false);
  const viewChangeVote = () => {
    setChangeVote(prevChangeVote => !prevChangeVote);
  };
  const [conversion, setConversion] = useState(false);
  const viewConversion = () => {
    setConversion(prevConversion => !prevConversion);
  };
  const [refundcalendar, setRefundCalendar] = useState(false);
  const viewRefundcalendar = () => {
    setRefundCalendar(prevRefundcalendar => !prevRefundcalendar);
  };
  const [changeCalendar, setChangeCalendar] = useState(false);
  const viewChangeCalendar = () => {
    setChangeCalendar(prevChangeCalendar => !prevChangeCalendar);
  };
  const [termcondition, setTermCondition] = useState(false);
  const viewTermCondition = () => {
    setTermCondition(prevTermCondition => !prevTermCondition);
  };
  const [refundpolicy, setRefundPolicy] = useState(false);
  const viewRefundPolicy = () => {
    setRefundPolicy(prevRefundPolicy => !prevRefundPolicy);
  };
  return (
    <View>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.showContent} onPress={viewChangeVote}>
          <CustomText textType="bold" style={styles.text}>
          {t('how_to_change')}
          </CustomText>
          <IconRight />
        </TouchableOpacity>
        {changeVote && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('present_voucher')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                paddingHorizontal: scale(20),
                paddingBottom: scale(10),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('you_must')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                paddingHorizontal: scale(20),
                paddingBottom: scale(10),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('please_note')}
              </CustomText>
            </View>
          </View>
        )}
        <TouchableOpacity style={styles.showContent} onPress={viewConversion}>
          <CustomText textType="bold" style={styles.text}>
          {t('conversion')}
          </CustomText>
          <IconRight />
        </TouchableOpacity>
        {conversion && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('present_voucher')}
              </CustomText>
            </View>
          </View>
        )}
        <TouchableOpacity
          style={styles.showContent}
          onPress={viewRefundcalendar}>
          <CustomText textType="bold" style={styles.text}>
          {t('refund_and_change')}
          </CustomText>
          <IconRight />
        </TouchableOpacity>
        {refundcalendar && (
          <View>
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
            {t('can_change_calendar')}
            
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '2%',
                alignItems: 'center',
                paddingBottom: '2%',
              }}>
              <IconFullyRefund />
              <View style={{marginLeft: '5%'}}>
                <CustomText textType="bold" style={styles.text}>
                {t('can_be_fully')}
                </CustomText>
              </View>
            </View>
            <CustomText textType="regular" style={styles.text}>
            {t('it_is_only')}
            </CustomText>
          </View>
        )}
        <TouchableOpacity
          style={styles.showContent}
          onPress={viewChangeCalendar}>
          <CustomText textType="bold" style={styles.text}>
          {t('calendar_change')}
          </CustomText>
          <IconRight />
        </TouchableOpacity>
        {changeCalendar && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('calendar_change')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('require_of_schedule')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('your_rearrangement')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('you_can_schedule')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('the_scheduling')}
              </CustomText>
            </View>
          </View>
        )}
        <TouchableOpacity style={styles.showContent} onPress={viewRefundPolicy}>
          <CustomText textType="bold" style={styles.text}>
          {t('refund_policy')}
          </CustomText>
          <IconRight />
        </TouchableOpacity>
        {refundpolicy && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('requirement_for_refund')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('your_reservation')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('the_final_refund')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('to_cancel_reservation')}
              </CustomText>
            </View>
          </View>
        )}
        <TouchableOpacity style={styles.showContent} onPress={viewTermCondition}>
          <CustomText textType="bold" style={styles.name1}>
          {t('term_condition')}
          </CustomText>
          <IconRight />
        </TouchableOpacity>
        {termcondition && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('there_is_surcharge')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('all_travelers')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('child_ticket')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('adult_ticket')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('infants_under')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('guest_with_high')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('you_are_allergic')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('this_activity')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('foreigners_must')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('you_plan_to')}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                columnGap: scale(10),
                // paddingTop: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View style={styles.dot}></View>
              <CustomText textType="medium" style={styles.text}>
              {t('itineraries_time')}
              </CustomText>
            </View>
          </View>
        )}
      </View>
      <View style={styles.line}></View>
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
    marginTop: scale(5),
  },
  showContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scale(30),
  },
});
