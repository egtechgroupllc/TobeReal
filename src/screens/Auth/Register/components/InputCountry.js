import {useQuery} from '@tanstack/react-query';
import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import {IconCheckBox, IconDown} from '../../../../assets/icon/Icon';
import {Button, CustomInput} from '../../../../components';
import BottomSheet from '../../../../components/BottomSheet';
import {useLanguage} from '../../../../hooks/useLanguage';
import {requireField} from '../../../../utils/validate';
import {getCountry} from '../../../../Model/api/common';

export default function InputCountry({control, name}) {
  const {t} = useLanguage();
  const bottomSheetRef = useRef();
  const [select, setSelect] = useState();

  const {data, isLoading, isError} = useQuery({
    queryKey: ['user', 'info', 'listAddress'],
    queryFn: () => getCountry(),
  });

  return (
    <View>
      <CustomInput
        control={control}
        sizeInput="medium"
        rules={{
          ...requireField(t('this_field_required')),
        }}
        placeholder="Contry"
        name={name}
        defaultValue={select}
        iconRight={IconDown}
        onPress={() => bottomSheetRef.current.open()}
      />
      <BottomSheet
        ref={bottomSheetRef}
        titleIndicator={'Occupancy'}
        snapPoints={['70%']}
        styleContent={{
          rowGap: scale(10),
          padding: scale(20),
        }}>
        <FlatList
          data={['123', '7', '8', '1289']}
          renderItem={({item, index}) => (
            <Button
              style={[
                index !== 0 && {
                  borderTopWidth: 1,
                },
                styles.item,
              ]}
              text={item}
              onPress={() => {
                setSelect(item);
                bottomSheetRef.current.close();
              }}
              iconRight={select === item && IconCheckBox}
              styleText={{
                color: select === item ? COLORS.primary : COLORS.text,
              }}
            />
          )}
        />

        <Button
          buttonType="large"
          text="Confirm"
          style={{
            marginTop: scale(10),
          }}
          styleText={{
            textType: 'semiBold',
          }}
          onPress={() => bottomSheetRef.current.close()}
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderTopColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(12),
    columnGap: scale(10),
    backgroundColor: 'transparent',
    paddingHorizontal: SIZES.large,
  },
});
