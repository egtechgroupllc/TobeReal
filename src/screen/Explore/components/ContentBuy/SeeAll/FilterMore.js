import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';

import {
  IconFilter,
  IconMapView,
  IconMyLocation,
  IconSearch,
  IconSort,
} from '../../../../../assets/icon/Icon';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';

import {useNavigation} from '@react-navigation/native';
import CustomText from '../../../../../components/CustomText';
import BigCity from '../../ContentAccommodation/BigCity';
import {CustomButton, CustomInput} from '../../../../../components';
import ChooseCalendar from '../../FindAccommodation/ChooseCalendar';
import {useForm} from 'react-hook-form';
import DropDown from './components/DropDown';
import BottomSheet from '../../../../../components/BottomSheet';
import {useLanguage} from '../../../../../hooks/useLanguage';
import RatingReview from '../../../../Map/Header/RatingReview';
import BedRoom from '../../../../Map/Header/BedRoom';
import ContentFilter from './components/ContentFilter';
import Filter from './components/Filter';
import Quantity from './components/Quantity';

const listLegalDoc = [
  {
    id: 1,
    name: 'All prices',
  },
  {
    id: 2,
    name: 'Under 500 million',
  },
  {
    id: 3,
    name: '500 - 800 million',
  },
  {
    id: 4,
    name: '800 million - 1 billion',
  },
  {
    id: 5,
    name: '1 - 2 billion',
  },
  {
    id: 6,
    name: '2 - 3 billion',
  },
  {
    id: 7,
    name: '3 - 5 billion',
  },
  {
    id: 8,
    name: '5 - 7 billion',
  },
];
const listInterior = [
  {
    id: 1,
    name: 'All area',
  },
  {
    id: 2,
    name: 'Under 30 m²',
  },
  {
    id: 3,
    name: '30 - 50 m²',
  },
  {
    id: 4,
    name: '80 - 100 m²',
  },
];

const content = [
  'Image',
  'Video',
  '3D & 360°',
  'Video Tiktok',
  'Video Youtube',
];
const direction = [
  'East',
  'West',
  'South',
  'North',
  'North - east',
  'North - west',
  'West - South',
  'South - East',
];
export default function FilterMore() {
  const {t} = useLanguage();
  const bottomSheetRef = useRef();
  const {control, watch} = useForm();
  return (
    <View style={styles.search}>
      <BottomSheet
        snapPoints={['50%', '80%']}
        titleIndicator={t('Filter more')}
        ref={bottomSheetRef}
        ComponentFooter={
          <View
            style={{
              borderTopWidth: scale(1),
              borderColor: COLORS.grey,
              backgroundColor: 'white',
              height: scale(100),
              flexDirection: 'row',
              columnGap: scale(20),
              paddingVertical: scale(20),
              paddingHorizontal: scale(40),
            }}>
            <CustomButton
              // onPress={() => {
              //   token ? navigate('NavigationAuth') : navigate('BookingRoomScreen');
              // }}
              outline
              buttonType="normal"
              style={{flex: 0.5}}
              text={t('Reset')}
              styleText={{
                fontSize: SIZES.xMedium,
              }}
            />
            <CustomButton
              // onPress={() => {
              //   token ? navigate('NavigationAuth') : navigate('BookingRoomScreen');
              // }}
              // onPress={onPress}
              buttonType="normal"
              style={{flex: 0.5}}
              text={t('Apply')}
              styleText={{
                fontSize: SIZES.xMedium,
              }}
            />
          </View>
        }
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(15),
        }}>
        <DropDown
          label={'Price'}
          name={'legal_documents'}
          control={control}
          data={listLegalDoc}
          style={{rowGap: scale(10)}}
          styleWrapper={styles.buttonStyle}
          price
          getKeyValue="name"
          watch={watch}
        />
        <DropDown
          label={'Acreage'}
          name={'legal_documents'}
          control={control}
          data={listInterior}
          acreage
          styleWrapper={styles.buttonStyle}
          getKeyValue="name"
          watch={watch}
        />
        <RatingReview />
        <BedRoom />
        <Quantity title={'Quantiy room and guest'} />
        <ContentFilter data={direction} title={'The direction of the house'} />
        <ContentFilter data={content} title={'News content is available'} />
      </BottomSheet>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => bottomSheetRef.current.open()}
          style={{
            borderColor: '#E3E3E3',
            borderWidth: scale(1),
            width: '25%',
            height: scale(27),
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: scale(5),
            columnGap: scale(5),
          }}>
          <IconSort width={scale(15)} height={scale(15)} />
          <CustomText
            textType="bold"
            style={{
              color: COLORS.black,
            }}>
            Filter
          </CustomText>
        </TouchableOpacity>
        <Filter />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    // padding: scale(12),
    borderRadius: scale(10),
    // backgroundColor: COLORS.white,
    // ...SHADOW,
    // minHeight: 200,
    zIndex: 99,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(10),
    paddingVertical: scale(14),
    borderBottomColor: COLORS.grey,
  },
  buttonStyle: {
    width: '100%',
    paddingVertical: scale(5),
  },
});
