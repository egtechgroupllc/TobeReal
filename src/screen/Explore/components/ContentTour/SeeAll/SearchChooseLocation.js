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
import {CustomInput} from '../../../../../components';
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
const content = [
  'Image',
  'Video',
  '3D & 360°',
  'Video Tiktok',
  'Video Youtube',
];
export default function SearchChooseLocation({onPress}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  const bottomSheetRef = useRef();
  const {control, watch} = useForm();
  return (
    <View style={styles.search}>
      <View>
        <CustomInput
          autoFocus
          iconLeft={IconSearch}
          styleIcon={{color: COLORS.white}}
          placeholderTextColor={COLORS.white}
          placeholder="Where would you like to go?"
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onPress('Around me')}
          style={[styles.searchItem, {borderBottomWidth: 1}]}>
          <IconMyLocation fill={COLORS.primary} />
          <CustomText style={{fontSize: SIZES.xMedium, color: COLORS.white}}>
            Around me
          </CustomText>
        </TouchableOpacity>

        {/* <TouchableOpacity activeOpacity={0.7} style={styles.searchItem}>
          <IconMapView
            fill={COLORS.primary}
            style={{
              height: scale(20),
              width: scale(20),
            }}
          />
          <CustomText style={{fontSize: SIZES.xMedium}}>
            Select on the map
          </CustomText>
        </TouchableOpacity> */}
      </View>

      <BigCity
        noContain
        renderReply={false}
        styleWrapper={{
          paddingHorizontal: 0,
          columnGap: scale(10),
          paddingVertical: scale(10),
        }}
        styleItem={{
          width: scale(90),
          minHeight: scale(80),
        }}
        styesTextTitle={{
          fontSize: SIZES.small,
        }}
        onPress={value => onPress(value.item)}
      />
      <ChooseCalendar
        style={{
          paddingVertical: scale(10),
          borderColor: COLORS.grey,
          borderTopWidth: 1,
        }}
        Checkin={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    padding: scale(12),
    borderRadius: scale(10),
    backgroundColor: '#99999966',
    ...SHADOW,
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
