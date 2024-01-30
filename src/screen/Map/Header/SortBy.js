import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CheckBox from '../../../components/CheckBox';
import CustomText from '../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import WrapperContent from '../../Explore/components/WrapperContent';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import FilterSort from '../../Explore/components/DetailAccommodation/Review/FilterSort';
import BottomSheet from '@gorhom/bottom-sheet';

const listSort = ['Lowest Price', 'Highest Price', 'Best Rating'];

export default function SortBy({onSort}) {
  const [checked, setChecked] = useState(undefined);

  return (
    <WrapperContent
      onPressSeeAll={() => console.log(1)}
      heading="Sorts results by"
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
          onPress={() => setChecked(index)}>
          <CustomText>{item}</CustomText>

          <View style={styles.radio}>
            {checked === index ? <View style={styles.dot} /> : null}
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
