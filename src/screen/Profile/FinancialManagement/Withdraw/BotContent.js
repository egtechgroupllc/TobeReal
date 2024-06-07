import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../../components/CustomText';
import {COLORS, SHADOW, SIZES, scale} from '../../../../assets/constants';
import {CustomInput} from '../../../../components';
import {IconNext} from '../../../../assets/icon/Icon';
import {useNavigation} from '@react-navigation/native';
import {requireField} from '../../../../utils/validate';
import {useLanguage} from '../../../../hooks/useLanguage';

export default function BotContent({control, setValue}) {
  const [bank, setBank] = useState(null);
  const {navigate} = useNavigation();
  const {t} = useLanguage();

  return (
    <View>
      <CustomText style={{fontSize: SIZES.medium}}>
        {t('choose_bank')}:
      </CustomText>
      <TouchableOpacity
        style={{...styles.boxItem, marginTop: scale(10)}}
        onPress={() =>
          navigate('ListBankScreen', {
            onGoBack: dataBack => {
              setBank(dataBack);
              setValue('bank_name', dataBack?.name);
            },
          })
        }>
        {bank?.icon}
        <CustomText textType="medium" style={{fontSize: SIZES.xMedium}}>
          {bank?.name || t('select_bank')}
        </CustomText>
        <IconNext
          width={scale(12)}
          height={scale(12)}
          fill={COLORS.textSub}
          style={{
            marginLeft: 'auto',
          }}
        />
      </TouchableOpacity>

      <CustomInput
        label={t('bank_number')}
        styleTextLabel={{fontSize: SIZES.medium}}
        style={{...styles.boxItem, borderWidth: 0}}
        styleWrapper={{paddingVertical: scale(10)}}
        control={control}
        rules={[requireField(t('this_field_required'))]}
        name="bank_number"
        placeholder={t('enter_bank_number')}
      />
      <CustomInput
        label={t('bank_holder')}
        styleTextLabel={{fontSize: SIZES.medium}}
        style={{...styles.boxItem, borderWidth: 0}}
        styleWrapper={{paddingVertical: scale(5)}}
        control={control}
        name="bank_owner"
        placeholder={t('enter_bank_holder')}
        rules={[requireField(t('this_field_required'))]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  boxItem: {
    width: '100%',
    minHeight: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
    paddingVertical: scale(10),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: scale(6),
    columnGap: scale(14),
    backgroundColor: '#fff',
  },
  wallet: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    columnGap: scale(5),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    flexDirection: 'row',
    right: scale(10),
    backgroundColor: COLORS.white,
    minHeight: scale(40),
    minWidth: scale(90),
    borderRadius: scale(10),
    ...SHADOW,
  },
});
