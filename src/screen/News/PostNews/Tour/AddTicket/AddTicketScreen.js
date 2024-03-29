import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainWrapper from '../../../../../components/MainWrapper';
import {useForm} from 'react-hook-form';
import {showMess} from '../../../../../assets/constants/Helper';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postAddTicket} from '../../../../../Model/api/apiTour';
import {CustomButton, CustomInput} from '../../../../../components';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {
  requireField,
  validateMaxLengthText,
} from '../../../../../utils/validate';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import SelectCurrency from '../../components/SelectCurrency';
import CustomText from '../../../../../components/CustomText';
import {useRoute} from '@react-navigation/native';

export default function AddTicketScreen() {
  const params = useRoute().params;
  const {handleSubmit, control, setValue, watch, reset} = useForm();

  const queryClient = useQueryClient();
  const addTicketMu = useMutation({
    mutationFn: postAddTicket,
  });

  const handlePostAddTicket = data => {
    addTicketMu.mutate(
      {data, tour_id: params?.id},
      {
        onSuccess: dataInside => {
          showMess(
            dataInside?.message,
            dataInside?.status ? 'success' : 'error',
          );

          if (dataInside?.status) {
            reset();
            queryClient.invalidateQueries(['tour', 'my-list']);
          }
        },
        onError: err => {
          console.log({err});
        },
      },
    );
  };

  const {t} = useLanguage();
  return (
    <MainWrapper
      refreshControl={false}
      styleContent={{
        marginVertical: scale(20),
        marginHorizontal: scale(10),
        rowGap: scale(20),
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          padding: scale(10),
          borderRadius: scale(10),
          ...SHADOW,
          rowGap: scale(20),
        }}>
        <CustomText
          textType="semiBold"
          style={{
            fontSize: SIZES.large,
          }}>
          Thêm Vé Vào Tour
        </CustomText>

        <CustomInput
          label={t('Tên Tour')}
          control={control}
          name="name"
          multiline
          maxLength={100}
          placeholder={t('Tên Tour')}
          rules={[
            requireField(t('this_field_required')),
            validateMaxLengthText(`${100} characters limit`, 100),
          ]}
          style={[
            styles.textInput,
            {
              height: scale(50),
            },
          ]}
          componentRight={
            <Text style={styles.numText}>
              {watch('name')?.length || 0}/{100}
            </Text>
          }
        />
        <CustomInput
          label={t('description_content')}
          control={control}
          name="description"
          multiline
          maxLength={5000}
          placeholder={t('description_content')}
          rules={[
            requireField(t('this_field_required')),
            validateMaxLengthText(`${5000} characters limit`, 5000),
          ]}
          style={[
            styles.textInput,
            {
              minHeight: scale(130),
              maxHeight: scale(300),
            },
          ]}
          componentRight={
            <Text style={styles.numText}>
              {watch('description')?.length || 0}/{5000}
            </Text>
          }
        />
        <View style={styles.line} />
        <CustomInput
          label={t('Số lượng vé')}
          control={control}
          name="quantity"
          placeholder={t('quantity')}
          rules={[requireField(t('this_field_required'))]}
          style={[styles.textInput]}
          keyboardType="number-pad"
        />

        <View style={styles.line} />

        <SelectCurrency control={control} />

        <CustomInput
          label={t('price')}
          control={control}
          name="price"
          placeholder={t('enter_price')}
          rules={requireField(t('this_field_required'))}
          style={{...styles.textInput}}
          keyboardType="number-pad"
          enableFormatNum
        />
      </View>
      <CustomButton
        linearGradientProps
        buttonType="medium"
        text={'Xác nhận'}
        onPress={handleSubmit(handlePostAddTicket)}
        style={{
          width: '100%',
        }}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  line: {
    borderWidth: 0.5,
    width: '100%',
    marginTop: scale(10),
    borderColor: '#F0B90B',
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
});
