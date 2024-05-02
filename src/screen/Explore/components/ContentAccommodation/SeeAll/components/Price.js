import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {
  COLORS,
  SHADOW,
  SIZES,
  WIDTH,
  scale,
} from '../../../../../../assets/constants';

import {formatPrice} from '../../../../../../utils/format';

import CustomText from '../../../../../../components/CustomText';
import WrapperContent from '../../../WrapperContent';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {CustomButton, CustomInput} from '../../../../../../components';

const min = 0;
const max = 100000;
export default function Price({onBudget, value, onPress}) {
  const {t} = useLanguage();
  const [multiSliderValue, setMultiSliderValue] = useState(value || [min, max]);
  return (
    <WrapperContent
      styleContent={{
        rowGap: scale(10),
        alignItem: 'center',
        marginTop: scale(-40),
      }}>
      <View
        style={{
          borderBottomWidth: scale(1),
          borderColor: COLORS.grey,
          backgroundColor: 'white',
          height: scale(70),
          flexDirection: 'row',
          columnGap: scale(10),
          paddingVertical: scale(20),
          paddingHorizontal: scale(40),
        }}>
        <CustomButton
          outline
          buttonType="normal"
          style={{flex: 0.5}}
          text={t('Reset')}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
        />
        <CustomButton
          onPress={() => {
            onPress && onPress(multiSliderValue);
          }}
          buttonType="normal"
          style={{flex: 0.5}}
          text={t('Apply')}
          // onPress={handleSubmit(handelFiter)}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: scale(20),
          columnGap: scale(10),
        }}>
        <CustomInput
          defaultValue={String(multiSliderValue[0])}
          styleWrapper={{
            flex: 1,
          }}
          label="Min"
          onChangeText={num => {
            setMultiSliderValue([+num, multiSliderValue[1]]);
          }}
          keyboardType="numeric"
        />
        <CustomInput
          defaultValue={String(multiSliderValue[1])}
          styleWrapper={{
            flex: 1,
          }}
          keyboardType="numeric"
          label="Max"
          onChangeText={num => {
            setMultiSliderValue([multiSliderValue[0], +num]);
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: scale(20),
        }}>
        <CustomText>{formatPrice(multiSliderValue[0])}</CustomText>
        <CustomText>{formatPrice(multiSliderValue[1])}</CustomText>
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
        // sliderLength={WIDTH.widthScreen - scale(16 * 3.8)}
        markerOffsetY={3}
        markerStyle={{
          borderWidth: 1.2,
          borderColor: COLORS.primary,
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
