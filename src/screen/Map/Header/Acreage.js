import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS, SIZES, WIDTH, scale} from '../../../assets/constants';
import CustomText from '../../../components/CustomText';
import {useLanguage} from '../../../hooks/useLanguage';
import {formatPrice} from '../../../utils/format';
import WrapperContent from '../../Explore/components/WrapperContent';
import {useCountry} from '../../../hooks/useCountry';
const min = 0;
const max = 500;
export default function Acreage({onAcreage, value}) {
  const {t} = useLanguage();
  const [multiSliderValue, setMultiSliderValue] = useState(value || [min, max]);
  return (
    <WrapperContent
      heading={t('acreage')}
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
          {formatPrice(multiSliderValue[0], {
            unit: 'm²',
          })}
        </CustomText>
        <CustomText>
          {t('over')}{' '}
          {formatPrice(multiSliderValue[1], {
            unit: 'm²',
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
        onValuesChange={values => setMultiSliderValue(values)}
        onValuesChangeFinish={value => {
          value && onAcreage && onAcreage(value);
        }}
      />
    </WrapperContent>
  );
}

const styles = StyleSheet.create({});