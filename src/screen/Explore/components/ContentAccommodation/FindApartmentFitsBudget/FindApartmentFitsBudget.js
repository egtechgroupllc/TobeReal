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
    priceMax: 7000000,
  },
  {
    icon: IconDiamond,
    textType: 'Luxury',
    priceMin: 7000000, // Use the priceMax value of the previous element
    priceMax: 0,
  },
];

export default function FindApartmentFitsBudget() {
  const [inputState, setInputState] = useState(null);

  const handleSelectFrequently = value => {
    setInputState(value);
  };

  return (
    <WrapperContent
      heading="Find apartment that fits your budget! 💳"
      subHeading="Price below is Monthly price"
      styleWrapper={{backgroundColor: '#f8f8f8'}}
      styleContent={styles.wrapper}>
      <SelectLocation />

      <View>
        <CustomText textType="semiBold" style={styles.title}>
          Input Price
        </CustomText>

        <View style={styles.box}>
          <View style={styles.boxInput}>
            <CustomText>Lowest</CustomText>
            <CustomInput
              placeholder="Lowest"
              componentRight={renderComponent()}
              defaultValue={
                inputState && `${formatPrice(inputState?.priceMin)}`
              }
            />
          </View>

          <View style={styles.boxInput}>
            <CustomText>Highest</CustomText>
            <CustomInput
              placeholder="Highest"
              componentRight={renderComponent()}
              defaultValue={
                inputState && `${formatPrice(inputState?.priceMax)}`
              }
            />
          </View>
        </View>
      </View>

      <View>
        <CustomText textType="semiBold" style={styles.title}>
          Frequently Used Price
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
        text="Find Accommodation"
        styleText={{
          color: '#fff',
          textType: 'semiBold',
          textTransform: 'uppercase',
        }}
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
  boxInput: {
    flex: 1,
    rowGap: scale(8),
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
    width: '90%',
    alignItems: 'center',
    borderLeftColor: COLORS.grey,
  },
});
