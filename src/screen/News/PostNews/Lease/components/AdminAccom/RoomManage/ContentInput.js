import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputLeaseMulti from '../../PostNewLease/GeneralInformation/InputLeaseMulti';
import {useLanguage} from '../../../../../../../hooks/useLanguage';
import {CustomInput, CustomText} from '../../../../../../../components';
import {COLORS, SIZES, scale} from '../../../../../../../assets/constants';
import {requireField} from '../../../../../../../utils/validate';

export default function ContentInput({
  control,
  setValue,
  watch,
  errors,
  value,
  onSort,
  isTour,
}) {
  const {t} = useLanguage();
  const listSort = [
    {id: 'ACTIVE', name: t('active')},
    {id: 'CLOSE', name: t('lock')},
  ];
  const [checked, setChecked] = useState(listSort?.[0]?.id);
  //   useEffect(() => {
  //     setValue('number_room', watch('number_room'));
  //     setValue('price', watch('price'));
  //   }, []);

  return (
    <View style={{rowGap: scale(10)}}>
      <CustomInput
        styleTextLabel={styles.label}
        label={`${t('enter_price_change')} (${t('optional')})`}
        control={control}
        enableFormatNum
        name="price"
        placeholder={t('enter_price')}
        style={styles.textInput}
      />
      <CustomText style={{color: COLORS.black + '70'}}>
        *{t('note')}: {t('this_price_is_listed_price')}
      </CustomText>
      {!isTour && (
        <CustomInput
          styleTextLabel={styles.label}
          label={`${t('enter_number_room_change')} (${t('optional')})`}
          control={control}
          name="number_room"
          placeholder={t('number_room')}
          style={styles.textInput}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: scale(130),
          columnGap: scale(20),
        }}>
        <CustomText style={styles.label}>
          {t('do_you_want_change_status')}
        </CustomText>
        {listSort.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            activeOpacity={0.7}
            onPress={() => {
              setChecked(item?.id);
              item?.id && onSort && onSort(item?.id);
            }}>
            <CustomText textType="medium">{item?.name}</CustomText>

            <View style={styles.radio}>
              {checked === item?.id ? <View style={styles.dot} /> : null}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: SIZES.xMedium,
    color: COLORS.black,
  },

  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(6),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#F0B90B',
  },

  textInput: {
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    borderRadius: scale(6),
  },
  numText: {
    fontSize: SIZES.small,
    position: 'absolute',
    top: scale(-20),
    right: 0,
    color: COLORS.black,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(4),
    columnGap: scale(10),
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
