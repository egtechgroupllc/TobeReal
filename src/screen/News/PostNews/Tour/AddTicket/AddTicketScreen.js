import {Image, StyleSheet, Text, View} from 'react-native';
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
import {
  COLORS,
  SHADOW,
  SIZES,
  images,
  scale,
} from '../../../../../assets/constants';
import SelectCurrency from '../../components/SelectCurrency';
import CustomText from '../../../../../components/CustomText';
import {useRoute} from '@react-navigation/native';
import General from './components/General';
import TicketDetail from './components/TicketDetail';

export default function AddTicketScreen() {
  const params = useRoute().params;
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: {errors},
  } = useForm();

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
        alignItems: 'center',
      }}>
      <View style={styles.button}>
        <Image
          source={images.rentbuy}
          style={{width: scale(38), height: scale(38)}}
        />
        <CustomText
          textType="medium"
          style={{...styles.text2, marginLeft: scale(10)}}>
          {t('Add ticket')}
        </CustomText>
      </View>
      <General
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
      />

      <TicketDetail
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
      />

      <CustomButton
        linearGradientProps
        buttonType="medium"
        text={'Xác nhận'}
        onPress={handleSubmit(handlePostAddTicket)}
        style={{
          width: '100%',
          marginTop: scale(20),
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
  button: {
    marginTop: scale(30),
    height: scale(63),
    width: '90%',
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(1),
    borderColor: '#F0B90B40',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowColor: '#F0B90B40',
  },
});