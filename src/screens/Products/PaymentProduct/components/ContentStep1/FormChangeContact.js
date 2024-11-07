/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useLanguage} from '~/hooks/useLanguage';
import {Button, CText} from '~/components';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import Input from '~/components/Input';
import {requireField, validateEmail} from '~/utils/validate';
import BottomSheet from '~/components/BottomSheet';

export default function FormChangeContact({data, isOpen, isTour}) {
  const {t} = useLanguage();
  const {control, handleSubmit} = useForm();

  const [apply, setApply] = useState(false);
  const bottomSheetRef = useRef();

  useEffect(() => {
    const dataStart = async () => {
      !isTour
        ? await EncryptedStorage.setItem(
            '@infoBooking',
            JSON.stringify({
              // username: data?.username,
              phone: data?.phone,
              email: data?.email,
              address: data?.address,
            }),
          )
        : await EncryptedStorage.setItem(
            '@infoBookingTour',
            JSON.stringify({
              // username: data?.username,
              phone: data?.phone,
              email: data?.email,
              address: data?.address,
            }),
          );
    };
    dataStart();
  }, [JSON.stringify(data)]);

  useEffect(() => {
    const loadInfoBooking = async () => {
      const result = !isTour
        ? await EncryptedStorage.getItem('@infoBooking')
        : await EncryptedStorage.getItem('@infoBookingTour');

      if (result) {
        setApply(JSON.parse(result));
      }
    };
    loadInfoBooking();
  }, []);

  useEffect(() => {
    isOpen && bottomSheetRef.current.open();
  }, [isOpen]);

  const handleApply = async value => {
    !isTour
      ? await EncryptedStorage.setItem('@infoBooking', JSON.stringify(value))
      : await EncryptedStorage.setItem(
          '@infoBookingTour',
          JSON.stringify(value),
        );
    setApply(value);
    bottomSheetRef.current.close();
  };

  const dataView = useMemo(() => {
    return {
      // username: apply?.name || data?.username,
      phone: apply?.phone || data?.phone,
      email: apply?.email || data?.email,
      address: apply?.address || data?.address,
    };
  }, [JSON.stringify(data), JSON.stringify(apply)]);
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => bottomSheetRef.current.open()}
        style={{
          paddingHorizontal: scale(12),
          paddingVertical: scale(5),
        }}>
        {/* <CText textType="medium" size={SIZES.xMedium}>
          {dataView?.username}
        </CText> */}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <CText style={{color: COLORS.White}}>{dataView?.email} - </CText>
          <CText style={{color: COLORS.White}}>{dataView?.phone}</CText>
        </View>
        <CText style={{color: COLORS.White}}>{dataView?.address}</CText>
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={['50%', '80%']}
        titleIndicator={t('contact_info')}
        // onDismiss={!apply && reset}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(16),
        }}>
        {/* <Input
          styleTextLabel={styles.label}
          label={t('contact_name')}
          control={control}
          defaultValue={dataView?.username}
          name="username"
          maxLength={100}
          placeholder={t('contact_name')}
          rules={[requireField(t('this_field_required'))]}
          style={styles.textInput}
        /> */}
        <Input
          styleTextLabel={styles.label}
          label={t('email')}
          control={control}
          defaultValue={dataView?.email}
          name="email"
          maxLength={50}
          placeholder={'example@gmail.com'}
          rules={[
            requireField(t('this_field_required')),
            validateEmail(t('invalid_email')),
          ]}
          style={styles.textInput}
          styleText={{color: COLORS.primary}}
        />
        <Input
          styleTextLabel={styles.label}
          label={t('address')}
          control={control}
          defaultValue={dataView?.address}
          name="address"
          maxLength={100}
          placeholder={t('contact_name')}
          rules={[requireField(t('this_field_required'))]}
          style={styles.textInput}
          styleText={{color: COLORS.primary}}
        />
        <Input
          styleTextLabel={styles.label}
          defaultValue={dataView?.phone}
          label={t('phone')}
          control={control}
          name="phone"
          maxLength={30}
          placeholder={t('phone')}
          rules={[requireField(t('this_field_required'))]}
          style={styles.textInput}
          styleText={{color: COLORS.primary}}
        />

        <Button title={t('apply')} onPress={handleSubmit(handleApply)} />
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
