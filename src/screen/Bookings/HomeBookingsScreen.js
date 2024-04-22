import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {
  COLORS,
  SHADOW,
  SIZES,
  WIDTH,
  images,
  scale,
} from '../../assets/constants';
import {CustomButton, CustomInput, TabSelect} from '../../components';
import MainWrapper from '../../components/MainWrapper';
import CustomImage from '../../components/CustomImage';
import CustomText from '../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import EmptyData from '../../components/EmptyData';
import {useLanguage} from '../../hooks/useLanguage';
import {
  IconHome,
  IconHotel,
  IconLocation,
  IconMarker,
  IconMyLocation,
} from '../../assets/icon/Icon';
import {ScrollView} from 'react-native-gesture-handler';

const listTab = ['Active Booking', 'Booking History'];
const dataWaiting = [
  {
    id: 1,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
  },
  {
    id: 2,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
  },
  {
    id: 3,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
  },
  {
    id: 4,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
  },
  {
    id: 5,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
  },
];
const dataHistory = [
  {
    id: 1,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
    type: 1,
  },
  {
    id: 2,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
    type: 2,
  },
  {
    id: 3,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
    type: 1,
  },
  {
    id: 4,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
    type: 1,
  },
  {
    id: 5,
    title: 'Hotel Marine',
    code: '15532131',
    price: 500,
    location: 'Indonesia',
    type: 2,
  },
];
export default function HomeBookingsScreen() {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  const [tabSelect, setTabSelect] = useState(listTab[0]);

  return (
    <MainWrapper styleContent={styles.wrapper} scrollEnabled={false}>
      <View>
        <TabSelect
          data={listTab}
          styleWrapper={{
            alignItems: 'center',
            borderRadius: 5,
            paddingBottom: scale(5),
          }}
          styleContainerTab={styles.containTab}
          styleTabActive={styles.tabActive}
          styleTabDefault={{
            backgroundColor: 'transparent',
          }}
          onChange={e => setTabSelect(e)}
        />
        {tabSelect === listTab[0] ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: scale(10),
              rowGap: scale(10),
            }}>
            {/* <CustomButton
              buttonType="medium"
              text={t('add_booking')}
              style={styles.btnAdd}
              styleText={{
                textType: 'semiBold',
              }}
              isShadow
            /> */}
            {dataWaiting.map(item => (
              <View style={styles.box}>
                <CustomText
                  textType="bold"
                  numberOfLines={2}
                  style={{
                    color: COLORS.black,
                    fontSize: SIZES.xMedium,
                  }}>
                  {item.title}
                </CustomText>
                <View style={styles.code}>
                  <CustomText
                    textType="regular"
                    style={{
                      color: COLORS.black,
                      fontSize: SIZES.small,
                    }}>
                    Booking code: {item.code}
                  </CustomText>
                  <CustomText
                    textType="regular"
                    style={{
                      color: COLORS.black,
                      fontSize: SIZES.xMedium,
                    }}>
                    Price: {item.price}$
                  </CustomText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: scale(10),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: scale(5),
                      flex: 1,
                    }}>
                    <IconMarker width={scale(15)} height={scale(15)} />
                    <CustomText
                      numberOfLines={2}
                      textType="semiBold"
                      style={{
                        color: COLORS.black,
                        fontSize: SIZES.small,
                        flex: 1,
                      }}>
                      {item.location}
                    </CustomText>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1.3,
                      columnGap: scale(5),
                    }}>
                    <CustomButton
                      styleWrapper={{flex: 1}}
                      text="PAY"
                      style={{height: scale(25)}}
                    />
                    <CustomButton
                      text="CANCEL"
                      styleWrapper={{flex: 1}}
                      style={{
                        height: scale(25),
                        backgroundColor: COLORS.white,
                        borderWidth: scale(1),
                        borderColor: COLORS.grey,
                      }}
                      styleText={{color: COLORS.black, textType: 'regular'}}
                    />
                  </View>
                </View>
                <View style={styles.line} />
                <View
                  style={{
                    backgroundColor: '#0794f3',
                    width: '50%',
                    height: scale(20),
                    borderRadius: scale(10),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CustomText
                    textType="bold"
                    style={{
                      color: COLORS.white,
                      fontSize: SIZES.xSmall,
                    }}>
                    Waiting transaction 15:00
                  </CustomText>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <FlatList
            data={dataHistory}
            contentContainerStyle={{
              paddingVertical: scale(10),
              rowGap: scale(10),
            }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            renderItem={({item}) => (
              <View style={styles.box}>
                <CustomText
                  textType="bold"
                  numberOfLines={2}
                  style={{
                    color: COLORS.black,
                    fontSize: SIZES.xMedium,
                  }}>
                  {item.title}
                </CustomText>
                <View style={styles.code}>
                  <CustomText
                    textType="regular"
                    style={{
                      color: COLORS.black,
                      fontSize: SIZES.small,
                    }}>
                    Booking code: {item.code}
                  </CustomText>
                  <CustomText
                    textType="regular"
                    style={{
                      color: COLORS.black,
                      fontSize: SIZES.xMedium,
                    }}>
                    Price: {item.price}$
                  </CustomText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: scale(10),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: scale(5),
                      flex: 1,
                    }}>
                    <IconMarker width={scale(15)} height={scale(15)} />
                    <CustomText
                      numberOfLines={2}
                      textType="semiBold"
                      style={{
                        color: COLORS.black,
                        fontSize: SIZES.small,
                        flex: 1,
                      }}>
                      {item.location}
                    </CustomText>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1.3,
                      columnGap: scale(5),
                    }}>
                    <CustomButton
                      styleWrapper={{flex: 1}}
                      text="PAY"
                      style={{height: scale(25)}}
                    />
                    <CustomButton
                      text="CANCEL"
                      styleWrapper={{flex: 1}}
                      style={{
                        height: scale(25),
                        backgroundColor: COLORS.white,
                        borderWidth: scale(1),
                        borderColor: COLORS.grey,
                      }}
                      styleText={{color: COLORS.black, textType: 'regular'}}
                    />
                  </View>
                </View>
                <View style={styles.line} />
                <View
                  style={{
                    backgroundColor: item.type === 1 ? 'green' : 'red',
                    width: '50%',
                    height: scale(20),
                    borderRadius: scale(10),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CustomText
                    textType="bold"
                    style={{
                      color: COLORS.white,
                      fontSize: SIZES.xSmall,
                    }}>
                    {item.type === 1
                      ? 'Successful transaction'
                      : 'Exceeded specified time limit'}
                  </CustomText>
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>

      {/* <EmptyData
        desc={t('no_active_booking')}
        textBtn={t('explore_accommodation')}
      /> */}
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    width: WIDTH.widthContain,
    // marginVertical: scale(20),
    marginTop: scale(10),
    alignItems: 'center',
  },
  containTab: {
    height: scale(56),
    alignItems: 'center',
    borderRadius: scale(12),
    backgroundColor: '#e6e7e8',
    padding: scale(4),
  },
  tabActive: {
    color: COLORS.primary,
    borderRadius: scale(12),
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
  },
  img: {
    width: scale(240),
    height: scale(240),
  },
  btnAdd: {
    position: 'absolute',
    bottom: scale(-70),
    right: 0,
    zIndex: 999,
    width: scale(150),
  },
  box: {
    backgroundColor: '#FDFDFD',
    minHeight: scale(100),
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: '#DADADA4D',
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    rowGap: scale(5),
    ...SHADOW,
  },
  code: {
    borderWidth: scale(1),
    height: scale(30),
    borderRadius: scale(6),
    borderColor: '#0000001A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    alignItems: 'center',
    marginTop: scale(5),
  },
  line: {
    backgroundColor: COLORS.grey,
    height: scale(1),
    width: '100%',
  },
});
