import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import {scale} from '../../assets/constants';
import {CustomInput} from '../../components';
import BottomSheet from '../../components/BottomSheet';
import {useLanguage} from '../../hooks/useLanguage';
import FilterSort from '../Explore/components/DetailAccommodation/Review/FilterSort';
import BedRoom from './Header/BedRoom';
import Budget from './Header/Budget';
import RatingReview from './Header/RatingReview';
import SortBy from './Header/SortBy';
import TypeAccommoda from './Header/TypeAccommoda';
const listFill = [
  {
    text: 'On Promotion',
  },
  {
    text: 'No Minimum Stay',
  },
  {
    text: 'Full Furnished',
  },
  {
    text: 'Unfurnished',
  },
];
export default function MapHeader() {
  const {t} = useLanguage();
  const bottomSheetRef = useRef();

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
      }}>
      {/* <HeaderBar /> */}
      <View style={{}}>
        <FilterSort
          text={t('filter')}
          listFill={listFill}
          noSelectDefault
          onSort={() => bottomSheetRef.current.open()}
        />

        <BottomSheet
          snapPoints={['50%', '80%']}
          titleIndicator={t('filter&sort')}
          ref={bottomSheetRef}
          styleContent={{
            paddingHorizontal: scale(16),
          }}>
          <CustomInput placeholder={t('accommodation_name')} />
          <TypeAccommoda />
          <RatingReview />
          <SortBy />
          <Budget />
          <BedRoom />
        </BottomSheet>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
