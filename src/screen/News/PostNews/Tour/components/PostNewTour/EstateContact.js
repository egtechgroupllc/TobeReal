import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {CustomButton, CustomInput} from '../../../../../../components';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {IconRight} from '../../../../../../assets/icon/Icon';
import Collapsible from 'react-native-collapsible';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {
  requireField,
  validateEmail,
  validatePhone,
} from '../../../../../../utils/validate';
import ButtonTabValidate from '../../../Lease/components/ButtonTabValidate';

export default function EstateContact({control, errors, watch}) {
  const {t} = useLanguage();
  const [viewContact, setViewContact] = useState(false);

  const arrKeywords = useRef([
    'business_name',
    'business_phone',
    'business_email',
  ]).current;

  return (
    <View>
      <ButtonTabValidate
        title={t('contact_info')}
        onPress={() => setViewContact(prev => !prev)}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />

      <Collapsible collapsed={!viewContact} style={styles.box}>
        <CustomInput
          label={`${t('contact_info')}:`}
          styleTextLabel={styles.label}
          placeholder={t('full_name')}
          placeholderTextColor={COLORS.grey}
          control={control}
          name="business_name"
          rules={requireField(t('enter_username'))}
          style={{...styles.textInput}}
        />
        <CustomInput
          placeholder={t('phone')}
          placeholderTextColor={COLORS.grey}
          control={control}
          name="business_phone"
          rules={[requireField(t('this_field_required'))]}
          style={{...styles.textInput}}
          keyboardType="number-pad"
        />

        <CustomInput
          placeholder={t('email')}
          placeholderTextColor={COLORS.grey}
          control={control}
          name="business_email"
          rules={[
            requireField(t('this_field_required')),
            validateEmail(t('invalid_email')),
          ]}
          style={{...styles.textInput}}
          keyboardType="email-address"
        />
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    backgroundColor: COLORS.transparentGrey,
    borderRadius: scale(6),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    borderColor: COLORS.transparentGrey,
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: COLORS.white,
  },

  textInput: {
    backgroundColor: COLORS.transparentGrey,
    borderColor: '#E3E3E3',
    borderRadius: scale(6),
  },
  label: {
    fontSize: SIZES.xMedium,
    color: COLORS.white,
    marginBottom: SIZES.xSmall,
  },
});
