import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';

import MainAuth from '../../../../../../components/MainAuth';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../../../../Profile/components/Header';
import CustomText from '../../../../../../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../../../../Profile/components/Button';
import {
  IconCheckBoxWhite,
  IconHome,
  IconUnCheckBoxWhite,
} from '../../../../../../assets/icon/Icon';
import {
  COLORS,
  SHADOW,
  SIZES,
  images,
  scale,
} from '../../../../../../assets/constants';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import CustomImage from '../../../../../../components/CustomImage';
import ChooseCalendar from '../../../FindAccommodation/ChooseCalendar';
import BoxTypeTicket from './components/BoxTypeTicket';
import ChooseCalendarRoom from '../../../DetailAccommodation/Rooms/ChooseCalendarRoom';
import BoxDetailPrice from './components/BoxDetailPrice';
import {useQuery} from '@tanstack/react-query';
import {getListTicketDate} from '../../../../../../Model/api/apiTour';
import {formatDate} from '../../../../../../utils/format';
import BoxContact from './components/BoxContact';
import {CustomButton} from '../../../../../../components';
import {useCountry} from '../../../../../../hooks/useCountry';

export default function BookTourScreen() {
  const data = useRoute().params;

  const [date, setDate] = useState();
  const [listAddTicket, setListAddTicket] = useState([]);
  const [check1, setCheck1] = useState(false);
  const toggleCheckBox1 = () => {
    setCheck1(prevCheck => !prevCheck);
  };

  const {t} = useLanguage();
  const {currency, country} = useCountry();

  const checkDiffentCountry = useMemo(() => {
    if (data?.paramsTour?.country?.id !== country?.id) {
      return true;
    }
  }, [data?.paramsTour?.country?.id, country?.id]);
  const {setOptions, navigate} = useNavigation();
  useEffect(() => {
    return setOptions({
      headerTitle: t('detail_tour_ticket'),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('BottomTab')}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const resultPercent = data?.tour_ticket_items?.map(item => {
    return item?.price_percent;
  });
  const minPercent = Math.min(...resultPercent);

  const notify = () => {};
  const dataPriceTicket = useQuery({
    queryKey: [
      'list',
      'ticket-date',
      {
        id_ticket: data?.id,
        date_start: formatDate(date?.selectedStartDate),
        date_end: formatDate(date?.selectedStartDate, {addDays: 1}),
      },
    ],
    queryFn: () =>
      getListTicketDate({
        id_ticket: data?.id,
        date_start: formatDate(date?.selectedStartDate),
        date_end: formatDate(date?.selectedStartDate, {addDays: 1}),
      }),
  });

  const dataPriceTicketEx = dataPriceTicket?.data?.data?.data?.rows[0]?.price;

  return (
    <MainAuth>
      <View style={styles.container}>
        <View style={styles.view}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: scale(20),
              alignItems: 'center',
            }}>
            <CustomImage
              source={data?.images?.[0]?.url}
              resizeMode="contain"
              style={styles.image}
            />
            <CustomText
              textType="semiBold"
              style={{
                ...styles.text2,
                color: COLORS.black,
                width: '80%',
                paddingHorizontal: scale(10),
              }}>
              {data?.name}
            </CustomText>
          </View>
          {/* <TouchableOpacity>
            <CustomText
              textType="semiBold"
              style={{
                ...styles.text2,
                color: COLORS.primary,
              }}>
              {t('ticket_detail')}
            </CustomText>
          </TouchableOpacity> */}
          <View
            style={{
              ...styles.line,
              marginTop: scale(10),
              backgroundColor: '#F0B90B80',
            }}></View>
          <CustomText
            textType="medium"
            style={{
              ...styles.text2,
              color: COLORS.black,
              marginTop: scale(10),
              alignSelf: 'flex-start',
              paddingHorizontal: scale(20),
            }}>
            {t('choose_time')}:
          </CustomText>
          <View
            style={{width: '90%', alignSelf: 'center', marginTop: scale(10)}}>
            <ChooseCalendarRoom
              isOneDay
              onSelectDate={value => {
                setDate(value);
              }}
              data={data}
              percentTour={minPercent}
            />
          </View>

          <BoxTypeTicket
            countryRate={
              dataPriceTicket?.data?.data?.data?.rows[0]?.currency
                ?.exchange_rate
            }
            checkDiffentCountry={checkDiffentCountry}
            data={data}
            onChangeQuantity={value => setListAddTicket(value)}
            dataPriceTicket={dataPriceTicketEx}
          />
          <BoxContact data={data} />
          <BoxDetailPrice
            countryRate={
              dataPriceTicket?.data?.data?.data?.rows[0]?.currency
                ?.exchange_rate
            }
            checkDiffentCountry={checkDiffentCountry}
            data={data}
            quantity={listAddTicket}
            dataPriceTicket={dataPriceTicketEx}
          />

          {/* <TouchableOpacity
            onPress={toggleCheckBox1}
            style={{width: '100%', alignItems: 'center'}}>
            <LinearGradient
              colors={['#FADD55', '#D88A00']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={{...styles.box1, marginBottom: scale(20)}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginLeft: scale(10)}}>
                  {check1 ? <IconCheckBoxWhite /> : <IconUnCheckBoxWhite />}
                </View>
                <View style={{marginLeft: scale(10)}}>
                  <CustomText
                    textType="semiBold"
                    style={{...styles.text2, color: COLORS.black}}>
                    {t('wallet')} Saveloka
                  </CustomText>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity> */}
        </View>
        <CustomButton
          styleWrapper={{
            alignSelf: 'center',
            width: '70%',
            marginTop: scale(10),
          }}
          text={t('request_to_book_tour')}
          onPress={() =>
            navigate('NoBottomTab', {
              screen: 'BookingTourConfirmScreen',
              params: {
                data,
                listAddTicket,
                dataPriceTicketEx,
                date,
                checkDiffentCountry: checkDiffentCountry,
                countryRate:
                  dataPriceTicket?.data?.data?.data?.rows[0]?.currency
                    ?.exchange_rate,
              },
            })
          }
        />
      </View>
    </MainAuth>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: scale(10),
    paddingBottom: scale(50),
    width: '90%',
    alignSelf: 'center',
  },
  view: {
    minHeight: scale(63),
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(1),
    borderColor: '#F0B90B40',
    backgroundColor: '#FFFFFF',
    shadowColor: '#F0B90B40',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  text: {
    fontSize: SIZES.medium,
  },
  text1: {
    fontSize: SIZES.xSmall,
  },
  text2: {
    fontSize: SIZES.small,
  },
  textSmall: {
    fontSize: SIZES.xxSmall,
  },
  button: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(40),
    width: scale(283),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  boxSum: {
    backgroundColor: '#EEEEEE',
    borderRadius: scale(3),
    width: scale(20),
    height: scale(20),
    alignItems: 'center',
    marginHorizontal: scale(3),
  },
  boxQuantity: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(3),
    borderWidth: scale(0.5),
    width: scale(34),
    height: scale(20),
    alignItems: 'center',
    borderColor: '#C7C7C7',
    justifyContent: 'center',
  },
  button1: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(33),
    width: scale(74),
    justifyContent: 'center',
    alignSelf: 'center',
  },

  line: {
    width: '100%',
    height: scale(1),
    backgroundColor: COLORS.grey,
  },

  box: {
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: scale(5),
    borderBottomRightRadius: scale(5),
    borderBottomStartRadius: scale(5),
    borderBottomEndRadius: scale(5),
    paddingHorizontal: scale(20),
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    width: '90%',
    paddingBottom: scale(20),
  },
  listFacilities: {
    marginTop: scale(20),
    borderRadius: scale(10),
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    width: '109%',
    minHeight: scale(100),
  },
  buttonEstateType: {
    marginTop: scale(20),
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    borderRadius: scale(10),
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
    // backgroundColor:'#E3E3E3'
  },
  buttonEstateTypes: {
    marginTop: scale(20),
    borderTopLeftRadius: scale(10),
    borderTopEndRadius: scale(10),
    borderTopRightRadius: scale(10),
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
    // backgroundColor:'#E3E3E3'
  },
  buttonCategories: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: scale(4),
    borderWidth: scale(1),
    borderColor: '#F0B90B80',
    height: scale(50),
    width: '90%',
    justifyContent: 'space-between',
    marginTop: scale(10),
    shadowColor: '#00000040',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    flexDirection: 'row',
    paddingHorizontal: scale(20),
  },
  img: {
    width: scale(21),
    height: scale(10),
  },
  image: {
    width: scale(43),
    height: scale(43),
    // backgroundColor: '#f5f5f5',
    // ...SHADOW,
  },
  box1: {
    backgroundColor: '#EEEEEE',
    height: scale(54),
    borderRadius: scale(8),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
    width: '90%',
  },
});
