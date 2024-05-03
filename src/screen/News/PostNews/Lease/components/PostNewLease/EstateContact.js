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
import ButtonTabValidate from '../ButtonTabValidate';
import InputPhone from '../../../../../components/InputPhone';

export default function EstateContact({control, errors, watch}) {
  const {t} = useLanguage();
  const [viewContact, setViewContact] = useState(false);

  const arrKeywords = useRef([
    'full_name',
    'contact_phone',
    'contact_email',
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
          control={control}
          name="contact_name"
          rules={requireField(t('enter_username'))}
          style={{...styles.textInput}}
        />
        <InputPhone
          placeholder={t('phone')}
          control={control}
          rules={[requireField(t('this_field_required'))]}
          style={{...styles.textInput}}
        />

        <CustomInput
          placeholder={t('email')}
          control={control}
          name="contact_email"
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
});
