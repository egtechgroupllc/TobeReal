import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {IconDown} from '../../../../../../assets/icon/Icon';
import {CustomInput} from '../../../../../../components';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {requireField} from '../../../../../../utils/validate';
import ButtonTabValidate from '../ButtonTabValidate';

export default function PaymentInfo({control, errors, watch}) {
  const {t} = useLanguage();
  const [viewContact, setViewContact] = useState(false);
  const arrKeywords = useRef(['km_to_center']).current;

  return (
    <View>
      <ButtonTabValidate
        title={t('payment_information')}
        onPress={() => setViewContact(prev => !prev)}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />

      <Collapsible collapsed={!viewContact} style={styles.box}>
        <CustomInput
          label={t('bank_name')}
          placeholder={t('Select')}
          onPress={() => {}}
          rules={requireField(t('this_field_required'))}
          style={{...styles.textInput}}
          iconRight={() => <IconDown />}
          styleText={{color: COLORS.black}}
          styleTextLabel={{color: COLORS.black}}
        />
        <View style={styles.line} />

        <CustomInput
          label={t('account_number')}
          placeholder={t('account_number')}
          style={{...styles.textInput}}
          control={control}
          rules={requireField(t('this_field_required'))}
          name="account_number"
        />
        <View style={styles.line} />

        <CustomInput
          label={t('account_holder')}
          placeholder={t('account_holder')}
          style={{...styles.textInput}}
          control={control}
          rules={requireField(t('this_field_required'))}
          name="account_holder"
        />
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(6),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    borderColor: COLORS.green,
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
  textInput: {
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    borderRadius: scale(6),
  },
  label: {
    fontSize: SIZES.xMedium,
    color: COLORS.black,
    marginBottom: SIZES.xSmall,
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#F0B90B',
  },
});
