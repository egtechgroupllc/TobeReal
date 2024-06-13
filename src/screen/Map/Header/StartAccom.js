import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import WrapperContent from '../../Explore/components/WrapperContent';
import CustomText from '../../../components/CustomText';
import OptionAccommodation from '../../Explore/components/FindAccommodation/OptionAccommodation';
import {useLanguage} from '../../../hooks/useLanguage';
import {IconStar} from '../../../assets/icon/Icon';
import {CustomButton} from '../../../components';

export default function RatingReview({onSort}) {
  const [checked, setChecked] = useState(undefined);
  const {t} = useLanguage();

  return (
    <View
      style={{
        rowGap: scale(10),
      }}>
      <CustomText textType="bold" style={{fontSize: SIZES.xMedium}}>
        Hang sao
      </CustomText>

      <View
        style={{
          columnGap: scale(10),
          alignItem: 'center',
          flexDirection: 'row',
        }}>
        {[...Array(5)].map((item, index) => (
          <CustomButton
            text={`${index + 1}`}
            iconRight={IconStar}
            outline
            onPress={() => setChecked(index)}
            style={{
              ...styles.item,
              borderWidth: checked === index ? 1.3 : 1,
              borderColor: checked === index ? COLORS.primary : '#f1f1f1',
            }}
            styleText={{
              fontSize: SIZES.small,
              color: checked === index ? COLORS.primary : '#000',
            }}
            styleIcon={{
              color: COLORS.primary,
              width: SIZES.small,
              height: SIZES.small,
            }}
          />
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
    height: scale(30),
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
