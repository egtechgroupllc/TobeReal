import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import {CustomInput, CustomText} from '../../../../components';
import {useLanguage} from '../../../../hooks/useLanguage';
import {
  requireField,
  validateMaxAmount,
  validateMinAmount,
  validateMinMaxAmount,
} from '../../../../utils/validate';

export default function ContentRepost({
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
        label={`${t('enter_number_day_you_want')}`}
        control={control}
        keyboardType="numeric"
        maxLength={3}
        name="number_days"
        placeholder={t('enter_number_day')}
        rules={[
          requireField(t('this_field_required')),
          validateMinAmount(`${t('minimum_amount_days')} ${1}`, 1),
          validateMaxAmount(`${t('maximum_amount_days')} ${365}`, 365),
        ]}
        style={styles.textInput}
      />
      <CustomText style={{color: COLORS.black + '70'}}>
        *{t('note')}: {t('this_number_day_repost')}
      </CustomText>
      <CustomInput
        styleTextLabel={styles.label}
        label={`${t('enter_price_change')} `}
        control={control}
        enableFormatNum
        name="price"
        rules={[requireField(t('this_field_required'))]}
        placeholder={t('enter_price')}
        style={styles.textInput}
      />
      <CustomText style={{color: COLORS.black + '70'}}>
        *{t('note')}: {t('this_price_is_listed_price')}
      </CustomText>
      {!isTour && (
        <CustomInput
          styleTextLabel={styles.label}
          label={`${t('enter_number_room_change')} `}
          control={control}
          name="number_room"
          rules={[requireField(t('this_field_required'))]}
          placeholder={t('number_room')}
          style={styles.textInput}
        />
      )}
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
