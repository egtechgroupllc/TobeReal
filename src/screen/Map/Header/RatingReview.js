import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import WrapperContent from '../../Explore/components/WrapperContent';
import CustomText from '../../../components/CustomText';
import OptionAccommodation from '../../Explore/components/FindAccommodation/OptionAccommodation';
import {useLanguage} from '../../../hooks/useLanguage';

const listSort = [
  {
    rating: '2',
    textRating: 'Pleasant',
  },
  {
    rating: '3',
    textRating: 'Good',
  },
  {
    rating: '4',
    textRating: 'Very good',
  },
  {
    rating: '5',
    textRating: 'Exceptional',
  },
];

export default function RatingReview({onSort}) {
  const [checked, setChecked] = useState(undefined);
  const {t} = useLanguage();

  return (
    <View
      style={{
        rowGap: scale(10),
      }}>
      <CustomText textType="bold" style={{fontSize: SIZES.xMedium}}>
        {t('review_score')}
      </CustomText>
      <View
        style={{
          columnGap: scale(10),
          alignItem: 'center',
          flexDirection: 'row',
        }}>
        {listSort.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              ...styles.item,
              borderWidth: checked?.rating === item.rating ? 1.3 : 1,
              borderColor:
                checked?.rating === item.rating ? COLORS.primary : '#f1f1f1',
            }}
            activeOpacity={0.7}
            onPress={() => setChecked(item)}>
            <CustomText
              textType="semiBold"
              style={
                checked?.rating === item.rating && {
                  color: COLORS.primary,
                }
              }>
              {item.rating}+
            </CustomText>

            <CustomText
              numberOfLines={1}
              style={
                checked?.rating === item.rating && {
                  color: COLORS.primary,
                }
              }>
              {item.textRating}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(4),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: '#f1f1f1',
    rowGap: scale(4),
    flex: 1,
  },
  boxLine: {
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
