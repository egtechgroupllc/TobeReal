/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import CustomText from '../../../../../components/CustomText';
import {useForm} from 'react-hook-form';
import BottomSheet from '../../../../../components/BottomSheet';
import {CustomButton, CustomInput} from '../../../../../components';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {requireField, validateEmail} from '../../../../../utils/validate';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function FormChangeContact({data}) {
  const {t} = useLanguage();
  const {control, handleSubmit} = useForm();

  const [apply, setApply] = useState(false);
  const bottomSheetRef = useRef();

  useEffect(() => {
    const loadInfoBooking = async () => {
      const result = await EncryptedStorage.getItem('@infoBooking');
      if (result) {
        setApply(JSON.parse(result));
      }
    };
    loadInfoBooking();
  }, []);

  const handleApply = async value => {
    await EncryptedStorage.setItem('@infoBooking', JSON.stringify(value));
    setApply(value);
    bottomSheetRef.current.close();
  };

  const dataView = useMemo(() => {
    return {
      username: apply?.name || data?.username,
      phone: apply?.phone || data?.phone,
      email: apply?.email || data?.email,
    };
  }, [JSON.stringify(data), JSON.stringify(apply)]);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => bottomSheetRef.current.open()}
        style={{
          paddingHorizontal: scale(12),
          paddingVertical: scale(10),
        }}>
        <CustomText textType="medium" size={SIZES.xMedium}>
          {dataView?.username}
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <CustomText>{dataView?.email} - </CustomText>
          <CustomText>{dataView?.phone}</CustomText>
        </View>
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={['50%', '80%']}
        titleIndicator={'Thông tin liên hệ'}
        // onDismiss={!apply && reset}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(16),
        }}>
        <CustomInput
          styleTextLabel={styles.label}
          label={t('Tên người liên hệ')}
          control={control}
          defaultValue={dataView?.username}
          name="name"
          maxLength={100}
          placeholder={t('Tên người liên hệ')}
          rules={[requireField(t('this_field_required'))]}
          style={styles.textInput}
        />
        <CustomInput
          styleTextLabel={styles.label}
          defaultValue={dataView?.phone}
          label={t('Số điện thoại')}
          control={control}
          name="phone"
          maxLength={30}
          placeholder={t('Số điện thoại')}
          rules={[requireField(t('this_field_required'))]}
          style={styles.textInput}
        />
        <CustomInput
          styleTextLabel={styles.label}
          label={t('Địa chỉ email')}
          control={control}
          defaultValue={dataView?.email}
          name="email"
          maxLength={50}
          placeholder={'email@gmail.com'}
          rules={[
            requireField(t('this_field_required')),
            validateEmail(t('invalid_email')),
          ]}
          style={styles.textInput}
        />

        <CustomButton text="Apply" onPress={handleSubmit(handleApply)} />
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    textType: 'medium',
    color: COLORS.text,
  },
  textInput: {
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
    borderRadius: scale(6),
  },
});
