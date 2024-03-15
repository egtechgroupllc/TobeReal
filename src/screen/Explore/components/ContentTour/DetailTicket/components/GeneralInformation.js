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
import Star from '../../../../../../components/Star';
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
            The price included
          </CustomText>
          <CustomText textType="medium" style={styles.text}>
            Carriage:
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
              Round -trip shuttle
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
              High speed train
            </CustomText>
          </View>
          <CustomText textType="medium" style={styles.text}>
            Tour guide:
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
              Thai-English speaking tour guide
            </CustomText>
          </View>
          <CustomText textType="medium" style={styles.text}>
            Meals:
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
              Light breakfast
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
              Lunch optional style (available vegetarian choice)
            </CustomText>
          </View>
          <CustomText textType="medium" style={styles.text}>
            Services/supplements:
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
              Diving mask and life jacket
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
              Admission fee
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
              Insurance provided by the operator
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
              Soft drink
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
              Seasonal fruits
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
              Cakes and snacks price does not include
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
              Other personal expenses
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
              Tip
            </CustomText>
          </View>
        </View>
        <View>
          <CustomText textType="semiBold" style={styles.text}>
            Voucher validity
          </CustomText>
          <View style={{flexDirection: 'row', marginTop: '2%'}}>
            <IconCalendar></IconCalendar>
            <View style={{marginLeft: '5%', marginTop: '1%'}}>
              <CustomText textType="medium" style={styles.text}>
                Use on the selected date:
              </CustomText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: scale(10),
                }}>
                <View style={{...styles.dot, width: '2.5%'}}></View>
                <CustomText textType="medium" style={styles.text}>
                  Valid every day normally
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
                  Valid every holiday
                </CustomText>
              </View>
            </View>
          </View>
        </View>
        <View>
          <CustomText textType="semiBold" style={styles.text}>
            Conversion method
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
                No reservation
              </CustomText>
              <CustomText textType="medium" style={styles.text}>
                You do not need to book before coming.
              </CustomText>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '2%',
              alignItems: 'center',
              paddingBottom:'2%'
            }}>
            <IconInputDirectly />
            <View style={{marginLeft: '5%',}}>
              <CustomText textType="bold" style={styles.text}>
                Input directly
              </CustomText>
            </View>
          </View>
          <CustomText textType="regular" style={styles.text}>
            - After confirming the reservation, you can see the service voucher
            in my reservation page or via email.
          </CustomText>
          <CustomText textType="regular" style={styles.text}>
            - When coming, just submit the service on the phone for the staff at
            the entrance is done!
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '2%',
              alignItems: 'center',
              paddingBottom:'2%'
            }}>
            <IconPrint />
            <View style={{marginLeft: '5%'}}>
              <CustomText textType="bold" style={styles.text}>
              No need to print payment cards
              </CustomText>
            </View>
          </View>
          <CustomText textType="regular" style={styles.text}>
          Just present the electronic ticket/payment card on your phone when converted or entered the door. Please adjust the appropriate screen brightness.
          </CustomText>
        </View>
      </View>
      <TermContent/>
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
