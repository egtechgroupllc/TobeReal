import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {
  CustomButton,
  CustomInput,
  CustomText,
  MainWrapper,
} from '../../components';
import {useLanguage} from '../../hooks/useLanguage';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {postKycAccount} from '../../Model/api_new/user/kyc';
import {formatDate} from '../../utils/format';
import {showMess} from '../../assets/constants/Helper';
import {requireField} from '../../utils/validate';
import {COLORS, scale, SIZES} from '../../assets/constants';
import DatePicker from 'react-native-date-picker';
import ChooseImgPicker from '../components/ChooseImgPicker';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
export default function VerifyAccountScreen() {
  const {setOptions, navigate, reset} = useNavigation();
  const {t} = useLanguage();
  const {control, handleSubmit, watch, setValue} = useForm();
  const queryClient = useQueryClient();
  const [openCheckStart, setOpenCheckStart] = useState(false);

  const [timeCheckStart, setTimeCheckStart] = useState(
    new Date('2024-01-01T6:00:00'),
  );

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('change_information'),
    });
  }, []);

  //   const kycAccountMutation = useMutation({
  //     mutationFn: postKycAccount,
  //   });

  //   const handleEditProfile = value => {
  //     const avatarSrc = extractSrc(value.avatar, true);

  //     const payload = {
  //       ...value,
  //       dateOfBirth: formatDate(timeCheckStart),
  //       avatar: avatarSrc, // chỉ src
  //     };

  //     kycAccountMutation.mutate(payload, {
  //       onSuccess: dataInside => {
  //         showMess(
  //           t(dataInside?.message),
  //           dataInside?.status ? 'success' : 'error',
  //         );

  //         if (dataInside?.status) {
  //           queryClient.invalidateQueries(['user', 'profile']);
  //           navigate('BottomTab');
  //         }
  //       },
  //       onError: error => {
  //         if (error.response) {
  //           showMess(error?.response?.data?.message, 'error');
  //         }
  //       },
  //     });
  //   };

  return (
    <MainWrapper>
      <View style={styles.container}>
        <CustomInput
          label={t('full_name')}
          control={control}
          name="fullname"
          placeholder={t('enter_fullname')}
          rules={[requireField(t('this_field_required'))]}
          style={styles.textInput}
          sizeInput="medium"
          styleTextLabel={styles.styleLabel}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: scale(20),
          }}>
          <CustomText style={{fontSize: SIZES.small}} textType="medium">
            {t('date_of_birth')}
          </CustomText>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setOpenCheckStart(true)}>
            <CustomText>{formatDate(timeCheckStart)}</CustomText>
          </TouchableOpacity>
        </View>
        <DatePicker
          mode="date"
          title={t('select_date')}
          modal
          open={openCheckStart}
          date={timeCheckStart}
          onConfirm={time => {
            setOpenCheckStart(false);
            setTimeCheckStart(time);
          }}
          onCancel={() => {
            setOpenCheckStart(false);
          }}
        />
        <CustomInput
          label={t('id_card_number')}
          control={control}
          name="idNumber"
          placeholder={t('enter_id_card_number')}
          rules={[requireField(t('this_field_required'))]}
          style={styles.textInput}
          sizeInput="medium"
          styleTextLabel={styles.styleLabel}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
          keyboardType="numeric"
        />
        <ChooseImgPicker
          title={t('upload_avatar')}
          control={control}
          name={'avatar'}
          maxFiles={1}
        />
        <ChooseImgPicker
          title={t('upload_avatar')}
          control={control}
          name={'avatar'}
          maxFiles={1}
        />
        <ChooseImgPicker
          title={t('upload_avatar')}
          control={control}
          name={'avatar'}
          maxFiles={1}
        />
        <CustomButton
          text={t('ok')}
          onPress={handleSubmit(handleEditProfile)}
          buttonType="medium"
          style={styles.button}
        />
      </View>
    </MainWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    rowGap: scale(14),
    marginTop: '10%',
    paddingHorizontal: scale(12),
  },
  button: {
    width: '100%',
    marginTop: scale(30),
  },

  textInput: {
    backgroundColor: COLORS.grey50,
    borderWidth: 0,
  },
  styleLabel: {
    textType: 'medium',
  },
  radio: {
    height: scale(15),
    aspectRatio: 1,
    borderRadius: 99,
    alignItems: 'center',
    backgroundColor: COLORS.grey,
    justifyContent: 'center',
  },
  dot: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 99,
    backgroundColor: COLORS.green,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(4),
    columnGap: scale(10),
  },
  input: {
    height: scale(30),
    backgroundColor: COLORS.border,
    paddingHorizontal: scale(10),
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: scale(10),
  },
});
