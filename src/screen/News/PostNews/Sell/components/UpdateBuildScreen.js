import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, scale, SHADOW, SIZES} from '../../../../../assets/constants';
import {
  CustomButton,
  CustomInput,
  MainWrapper,
} from '../../../../../components';
import {
  requireField,
  validateMaxLengthText,
  validateMinLength,
} from '../../../../../utils/validate';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {useForm} from 'react-hook-form';
import DateTime from '../../Lease/VoucherManage/components/DateTime';
import ChooseImgPicker from '../../../../components/ChooseImgPicker';
import {showMess} from '../../../../../assets/constants/Helper';
import {useNavigation} from '@react-navigation/native';

export default function UpdateBuildScreen() {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: {errors},
  } = useForm();
  return (
    <MainWrapper
      styleContent={{
        paddingHorizontal: scale(20),
        paddingVertical: scale(20),
        paddingBottom: scale(100),
      }}
      headerTitle={'Cập nhật tiến trình xây dựng'}>
      <View style={styles.content}>
        <CustomInput
          label={t('description_content')}
          control={control}
          name="description"
          maxLength={2000}
          multiline
          placeholder={t('enter_a_description')}
          rules={[
            requireField(t('this_field_required')),
            validateMaxLengthText(`${2000} characters limit`, 2000),
          ]}
          style={[
            styles.textInput,
            {
              minHeight: scale(130),
              maxHeight: scale(500),
            },
          ]}
          componentRight={
            <Text style={styles.numText}>
              {watch('description')?.length || 0}/{2000}
            </Text>
          }
        />
        <View style={styles.line} />
        <DateTime
          styleTitle={{fontSize: SIZES.small}}
          onChange={value => {
            setValue('date_start', value?.date_start);
            setValue('date_end', value?.date_end);
          }}
        />
        <View style={styles.line} />
        <ChooseImgPicker
          title={'Hinh ảnh tiến trình xây dựng'}
          control={control}
          rules={[validateMinLength(t('this_field_required'), 1)]}
          name="files"
        />
      </View>

      <CustomButton
        // linearGradientProps

        buttonType="medium"
        text={'Cập nhật'}
        onPress={() => {
          showMess('Cập nhật thành công');
          setTimeout(() => {
            navigate('VerifyBlockchainScreen');
          }, 1000);
        }}
        // onPress={handlePostLease}
        style={{
          marginTop: scale(20),
          width: '40%',
        }}
        styleWrapper={{
          alignSelf: 'flex-end',
        }}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.pioBox,
    flex: 1,
    minHeight: scale(300),
    padding: scale(12),
    borderRadius: scale(9),
    ...SHADOW,
    rowGap: scale(10),
    paddingBottom: scale(20),
  },
  numText: {
    fontSize: SIZES.small,
    position: 'absolute',
    top: scale(-20),
    right: 0,
    color: COLORS.black,
  },
  line: {
    backgroundColor: COLORS.grey,
    height: 1,
    width: '100%',
  },
});
