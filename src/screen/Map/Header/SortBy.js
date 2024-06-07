import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CheckBox from '../../../components/CheckBox';
import CustomText from '../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import WrapperContent from '../../Explore/components/WrapperContent';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import FilterSort from '../../Explore/components/DetailAccommodation/Review/FilterSort';
import BottomSheet from '@gorhom/bottom-sheet';
import {useLanguage} from '../../../hooks/useLanguage';

export default function SortBy({onSort, value}) {
  const [checked, setChecked] = useState(value || undefined);

  const {t} = useLanguage();
  const listSort = [t('lowest_price'), t('highest_price'), t('best_rating')];

  return (
    <WrapperContent
      onPressSeeAll={() => console.log(1)}
      heading={t('sort_result')}
      styleHeading={{
        paddingHorizontal: 0,
      }}
      styleTextHeading={{
        fontSize: SIZES.xMedium,
      }}
      styleContent={{
        rowGap: scale(4),
        alignItem: 'center',
      }}>
      {listSort.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          activeOpacity={0.7}
          onPress={() => {
            setChecked(item);
            item && onSort && onSort(item);
          }}>
          <CustomText>{item}</CustomText>

          <View style={styles.radio}>
            {checked === item ? <View style={styles.dot} /> : null}
          </View>
        </TouchableOpacity>
      ))}
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(4),
  },
  radio: {
    height: scale(20),
    aspectRatio: 1,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: '70%',
    aspectRatio: 1,
    borderRadius: 99,
    backgroundColor: COLORS.primary,
  },
});
