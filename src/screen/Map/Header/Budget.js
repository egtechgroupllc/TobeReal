import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS, SHADOW, SIZES, WIDTH, scale} from '../../../assets/constants';
import CustomText from '../../../components/CustomText';
import {useLanguage} from '../../../hooks/useLanguage';
import {formatPrice} from '../../../utils/format';
import WrapperContent from '../../Explore/components/WrapperContent';
import {useCountry} from '../../../hooks/useCountry';
import {IconLogoSaveloka} from '../../../assets/icon/Icon';

export default function Budget({onBudget, value, estateT}) {
  const min = 0;
  const max = estateT ? 500000 : 2000;

  const {currency} = useCountry();
  const {t} = useLanguage();
  const [multiSliderValue, setMultiSliderValue] = useState(value || [min, max]);
  useEffect(() => {
    setMultiSliderValue([min, max]);
  }, [estateT, max]);
  return (
    <WrapperContent
      heading={t('budget')}
      styleHeading={{
        paddingHorizontal: 0,
      }}
      styleTextHeading={{
        fontSize: SIZES.xMedium,
      }}
      styleContent={{
        rowGap: scale(10),
        alignItem: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <CustomText>
          {formatPrice(multiSliderValue[0] * currency?.exchange_rate, {
            currency: currency?.currency_code,
          })}
        </CustomText>
        <CustomText>
          {formatPrice(multiSliderValue[1] * currency?.exchange_rate, {
            currency: currency?.currency_code,
          })}
        </CustomText>
      </View>
      <MultiSlider
        containerStyle={{
          width: '100%',
          alignItems: 'center',
          height: scale(30),
        }}
        min={min}
        max={max}
        allowOverlap
        // onValuesChangeFinish={onValuesChangeFinish}
        values={value || [min, max]}
        enableLabel={false}
        trackStyle={{
          height: scale(8),
          borderRadius: scale(10),
        }}
        minMarkerOverlapDistance={10}
        selectedStyle={{
          backgroundColor: COLORS.primary,
        }}
        unselectedStyle={{
          backgroundColor: '#EEF3F7',
        }}
        sliderLength={WIDTH.widthScreen - scale(16 * 3.8)}
        markerOffsetY={3}
        markerStyle={{
          borderWidth: 1.2,
          borderColor: COLORS.primary,
        }}
        customMarker={() => {
          return (
            <View
              style={{
                backgroundColor: COLORS.white,
                borderRadius: scale(99),
                width: scale(30),
                height: scale(30),
                alignItems: 'center',
                justifyContent: 'center',
                ...SHADOW,
                borderWidth: 1,
                borderColor: COLORS.grey,
              }}
            />
          );
        }}
        onValuesChange={values => setMultiSliderValue(values)}
        onValuesChangeFinish={value => {
          value && onBudget && onBudget(value);
        }}
      />
    </WrapperContent>
  );
}

const styles = StyleSheet.create({});
