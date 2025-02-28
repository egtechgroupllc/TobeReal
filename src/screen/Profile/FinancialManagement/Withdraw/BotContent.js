import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {COLORS, SHADOW, SIZES, scale} from '../../../../assets/constants';
import {IconNext} from '../../../../assets/icon/Icon';
import {CustomImage, CustomInput} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {useLanguage} from '../../../../hooks/useLanguage';
import {requireField} from '../../../../utils/validate';

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
        style={{...styles.boxItem, marginTop: scale(10), flex: 1}}
        onPress={() =>
          navigate('NoBottomTab', {
            screen: 'ListBankScreen',
            params: {
              onGoBack: dataBack => {
                setBank(dataBack);
                setValue(
                  'bank_name',
                  `${dataBack?.name} (${dataBack?.short_name})`,
                );
              },
            },
          })
        }>
        {bank?.logo && (
          <CustomImage
            source={{uri: bank?.logo}}
            style={{
              height: scale(50),
              width: scale(50),
            }}
            resizeMode="contain"
          />
        )}
        <CustomText textType="medium" style={{fontSize: SIZES.xSmall, flex: 1}}>
          {bank ? `${bank.name} (${bank.short_name})` : t('select_bank')}
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
        style={{...styles.boxItem}}
        styleWrapper={{paddingVertical: scale(10)}}
        control={control}
        rules={[requireField(t('this_field_required'))]}
        name="bank_number"
        placeholder={t('enter_bank_number')}
      />
      <CustomInput
        label={t('bank_holder')}
        styleTextLabel={{fontSize: SIZES.medium}}
        style={{...styles.boxItem}}
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
    paddingHorizontal: scale(16),
    ...SHADOW,
    borderRadius: scale(6),
    columnGap: scale(14),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.pioBox,
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
