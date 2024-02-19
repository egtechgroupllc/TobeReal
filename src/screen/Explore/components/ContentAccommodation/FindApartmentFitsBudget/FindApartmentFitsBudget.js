import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import {
  IconBig,
  IconDiamond,
  IconManyStar,
  IconMarker,
  IconNext,
} from '../../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../../components';
import CustomText from '../../../../../components/CustomText';
import {formatPrice} from '../../../../../utils/format';
import WrapperContent from '../../WrapperContent';
import FrequentlyPriceBox from './FrequentlyPriceBox';
import BottomSheet from '../../../../../components/BottomSheet';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import SelectLocation from './SelectLocation';
import {useForm} from 'react-hook-form';
import {useLanguage} from '../../../../../hooks/useLanguage';

const listFrequentlyPrice = [
  {
    icon: IconBig,
    textType: 'Budget',
    priceMin: 0,
    priceMax: 4500000,
  },
  {
    icon: IconManyStar,
    textType: 'Popular',
    priceMin: 4500000, // Use the priceMax value of the previous element
    priceMax: 700000.131,
  },
  {
    icon: IconDiamond,
    textType: 'Luxury',
    priceMin: 7000000, // Use the priceMax value of the previous element
    priceMax: 0,
  },
];

export default function FindApartmentFitsBudget() {
  const {t} = useLanguage();
  const [inputState, setInputState] = useState(null);

  const handleSelectFrequently = value => {
    setInputState(value);
  };
  const {control, handleSubmit, setValue} = useForm();
  useEffect(() => {
    if (inputState) {
      setValue('lowest', inputState.priceMin);
      setValue('highest', inputState.priceMax);
    }
  }, [inputState]);

  return (
    <WrapperContent
      heading={t('find_appartment')}
      subHeading={t('price_below')}
      styleWrapper={{backgroundColor: '#f8f8f8'}}
      styleContent={styles.wrapper}>
      <SelectLocation control={control} name="location" />

      <View>
        <CustomText textType="semiBold" style={styles.title}>
          Input Price
        </CustomText>

        <View style={styles.box}>
          <CustomInput
            enableFormatNum
            control={control}
            name="lowest"
            label={t('lowest')}
            placeholder={t('lowest')}
            componentRight={renderComponent()}
            style={{flex: 1}}
            defaultValue={
              inputState &&
              `${formatPrice(inputState?.priceMin, {showCurrency: false})}`
            }
          />

          <CustomInput
            enableFormatNum
            control={control}
            name="highest"
            label={t('highest')}
            placeholder={t('highest')}
            componentRight={renderComponent()}
            style={{flex: 1}}
            defaultValue={
              inputState &&
              `${formatPrice(inputState?.priceMax, {showCurrency: false})}`
            }
          />
        </View>
      </View>

      <View>
        <CustomText textType="semiBold" style={styles.title}>
          {t('frequently')}
        </CustomText>
        <View style={styles.box}>
          {listFrequentlyPrice.map((item, index) => {
            return (
              <FrequentlyPriceBox
                key={`key-${item.textType}-${index}`}
                icon={item?.icon}
                textType={item?.textType}
                priceMin={item?.priceMin}
                priceMax={item?.priceMax}
                onPress={() => handleSelectFrequently(item)}
              />
            );
          })}
        </View>
      </View>

      <CustomButton
        buttonType="medium"
        text={t('Find_Accommodation')}
        styleText={{
          color: '#fff',
          textType: 'semiBold',
          textTransform: 'uppercase',
        }}
        onPress={handleSubmit(value => console.log(value))}
      />
    </WrapperContent>
  );
}
const renderComponent = () => (
  <View style={styles.componentRight}>
    <CustomText>$</CustomText>
  </View>
);
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    margin: scale(12),
    padding: scale(12),
    rowGap: scale(16),
    ...SHADOW,
  },

  title: {
    fontSize: SIZES.xMedium,
    marginBottom: scale(8),
  },
  box: {
    flexDirection: 'row',
    columnGap: scale(10),
  },
  componentRight: {
    borderLeftWidth: 1,
    width: '17%',
    alignItems: 'center',
    borderLeftColor: COLORS.grey,
  },
});
