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
            How to change the vote
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
                Present voucher on your phone or print, along with your
                passport/ID to exchange gifts for the tour operator.
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
                You must be willing to take part in the tour and the gathering
                place has scheduled. If you are not present at the time and
                place of the meeting, you will be left behind and your
                reservation will be considered invalid. You can ask for a
                schedule based on the approval of the tour operator and the
                space on the day you have chosen.
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
                Please note that only your Traveloka payment card is valid for
                entry. Payment receipts or payment evidence cannot be used for
                admission.
              </CustomText>
            </View>
          </View>
        )}
        <TouchableOpacity style={styles.showContent} onPress={viewConversion}>
          <CustomText textType="bold" style={styles.text}>
            Conversion
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
                Present voucher on your phone or print, along with your
                passport/ID to exchange gifts for the tour operator.
              </CustomText>
            </View>
          </View>
        )}
        <TouchableOpacity
          style={styles.showContent}
          onPress={viewRefundcalendar}>
          <CustomText textType="bold" style={styles.text}>
            Refund and change calendar
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
                  Input directly
                </CustomText>
              </View>
            </View>
            <CustomText textType="regular" style={styles.text}>
              Can change the calendar in my reservation page before the selected
              date of arrival.
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
                  Can be fully refunded
                </CustomText>
              </View>
            </View>
            <CustomText textType="regular" style={styles.text}>
              It is only possible to request a refund process before the
              selection date. See the refund policy below for more information.
            </CustomText>
          </View>
        )}
        <TouchableOpacity
          style={styles.showContent}
          onPress={viewChangeCalendar}>
          <CustomText textType="bold" style={styles.text}>
            Calendar Change Policy
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
                You can only change your booking schedule up to 2 times.
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
                Requirement of a schedule can be done up to 1 day before the
                selected visit date.
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
                Your rearrangement schedule will apply to all guests in 1
                reservation code.
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
                You can schedule your reservation to any day available in the
                period from the date of issuance of the voucher until after 14
                days from the date of your original sightseeing. Please note
                that you can only change the calendar to another day than the
                same price or lower than your original reservation.
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
                The scheduling reservation will not be refunded.
              </CustomText>
            </View>
          </View>
        )}
        <TouchableOpacity style={styles.showContent} onPress={viewRefundPolicy}>
          <CustomText textType="bold" style={styles.text}>
            Refund policy
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
                Requirement for the latest 2 days before your choice to receive
                100% refund.
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
                Your reservation will not be refunded if you ask for a refund of
                less than 2 days before the selected date.
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
                The final refund will not include service fee, coupon and / or a
                single bank transfer fee.
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
                To cancel your reservation and ask for a refund, please visit my
                reservation item. In the reservation management section, touch
                the refund and follow the refund process (available on the
                Traveloka application version 3.18 or higher or the Traveloka
                website on the computer).
              </CustomText>
            </View>
          </View>
        )}
        <TouchableOpacity style={styles.showContent} onPress={viewTermCondition}>
          <CustomText textType="bold" style={styles.name1}>
            Term & condition
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
              There is a surcharge of THB 1000 for tours operating during the New Year period and Songkran period. Please pay additional fees directly to the tour operator.
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
              All travelers must carry identification (or passport) with them at all times.
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
              Child tickets apply to children from 4 to 11 years old or 120cm or less in height.
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
              Adult tickets apply to people from 12 to 60 years old or over 120cm tall.
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
              Infants under 1 year old, seniors over 60 years old, and pets are not allowed on the tour.
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
              Guests with high blood pressure, heart disease, pregnancy, asthma, and bone or orthopedic diseases are not allowed to participate in this tour.
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
              If you are allergic to a particular food, please let the operator know before travelling.
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
              This activity is not suitable for children under 2 years old, pregnant women, or people with medical conditions or disabilities.
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
              Foreigners must apply for an E-Visa via https://evisa.moip.gov.mm/ and submit the approved visa to the agency 7 days before the travel date.
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
              If you plan to travel during a major festival, you should book tickets at least a month in advance.
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
              Itineraries and times above are approximate and may be amended without notice to suit local tides and weather conditions.
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
