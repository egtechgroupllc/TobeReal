import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SHADOW, SIZES, WIDTH} from '~/assets/constants';
import CText from '~/components/CText';
import {useCountry} from '~/hooks/useCountry';
import {useLanguage} from '~/hooks/useLanguage';
import {formatPrice} from '~/utils/format';
import {scale} from '~/utils/scale';

export default function Budget({onBudget, value}) {
  const min = 0;
  const max = 2000;

  const {currency} = useCountry();
  const {t} = useLanguage();
  const [multiSliderValue, setMultiSliderValue] = useState(value || [min, max]);
  useEffect(() => {
    setMultiSliderValue([min, max]);
  }, [max]);
  return (
    <View style={{rowGap: scale(10)}}>
      <CText
        style={{fontSize: SIZES.small, color: COLORS.White}}
        textType="bold">
        Choose price
      </CText>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <CText
          style={{fontSize: SIZES.xMedium, color: COLORS.White}}
          textType="bold">
          {/* {formatPrice(multiSliderValue[0] * currency?.exchange_rate, {
            currency: currency?.currency_code,
          })} */}
          {formatPrice(multiSliderValue[0])}
        </CText>
        <CText
          style={{fontSize: SIZES.xMedium, color: COLORS.White}}
          textType="bold">
          {/* {formatPrice(multiSliderValue[1] * currency?.exchange_rate, {
            currency: currency?.currency_code,
          })} */}
          {formatPrice(multiSliderValue[1])}
        </CText>
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
          backgroundColor: COLORS.cyan,
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
                backgroundColor: COLORS.bluecyan,
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
    </View>
  );
}

const styles = StyleSheet.create({});
