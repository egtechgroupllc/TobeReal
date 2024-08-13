import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import MainWrapper from '../../../../../components/MainWrapper';
import {useForm} from 'react-hook-form';
import {showMess} from '../../../../../assets/constants/Helper';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
  postAddTicket,
  postAddTypeTicket,
} from '../../../../../Model/api/apiTour';
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
import {useNavigation, useRoute} from '@react-navigation/native';
import General from './components/General';
import TicketDetail from './components/TicketDetail';
import {IconHome} from '../../../../../assets/icon/Icon';
import TypeTicket from './components/TypeTicket';

export default function AddTicketScreen() {
  const params = useRoute().params;
  const {setOptions, navigate, addListener} = useNavigation();
  const {t} = useLanguage();
  const [forms, setForms] = useState([0]);
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('create_tour_ticket'),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigate('POST', {screen: 'PostNewsScreen'})}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
      headerLeftNavigate: 'TourScreen',
      // headerLeft: () => (
      //   <TouchableOpacity onPress={() => navigate('PostNewLeaseScreen')}>
      //     <IconGoBack style={{width: scale(20)}} />
      //   </TouchableOpacity>
      // ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    getValues,
    formState: {errors},
  } = useForm();

  const queryClient = useQueryClient();
  const addTicketMu = useMutation({
    mutationFn: postAddTicket,
  });
  const addTypeTicketMu = useMutation({
    mutationFn: postAddTypeTicket,
  });
  const AddTypeTicket = value => {
    const {price_percent, description_item, quantity, name_item} = getValues();
    const price_percent_final = value?.isDiscount
      ? (100 - price_percent) / 100
      : price_percent / 100 + 1;
    delete value?.isDiscount;

    addTypeTicketMu.mutate(
      {
        tour_ticket_id: value,
        name: name_item,
        description: description_item,
        quantity,
        price_percent: price_percent_final,
      },
      {
        onSuccess: dataInside => {
          showMess(
            dataInside?.message,
            dataInside?.status ? 'success' : 'error',
          );
          if (dataInside?.status) {
            reset();

            queryClient.invalidateQueries(['tour', 'my-list']);
            navigate('NoBottomTab', {
              screen: 'TourManagementScreen',
            });
          }
        },
        onError: err => {
          console.log({err});
        },
      },
    );
  };

  const handlePostAddTicket = data => {
    delete data?.price_percent;
    delete data?.description_item;
    delete data?.quantity;
    delete data?.type;
    delete data?.name_item;
    delete data?.isDiscount;

    addTicketMu.mutate(
      {data, tour_id: params?.id},
      {
        onSuccess: dataInside => {
          showMess(
            dataInside?.message,
            dataInside?.status ? 'success' : 'error',
          );

          if (dataInside?.status) {
            AddTypeTicket(dataInside?.data?.id);
          }
        },
        onError: err => {
          console.log({err});
        },
      },
    );
  };
  useEffect(() => {
    addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }, []);
  return (
    <MainWrapper
      optionsHeader={{
        gestureEnabled: false,
        headerLeft: () => {},
        headerTitle: t('create_tour_ticket'),
      }}
      refreshControl={false}
      styleContent={{
        marginVertical: scale(20),
        marginHorizontal: scale(10),
        rowGap: scale(20),
        alignItems: 'center',
      }}>
      {/* <View style={styles.button}>
        <Image
          source={images.rentbuy}
          style={{width: scale(38), height: scale(38)}}
        />
        <CustomText
          textType="medium"
          style={{...styles.text2, marginLeft: scale(10)}}>
          {t('Add ticket')}
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
              maxHeight: scale(500),
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
      </View> */}
      <General
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
      />
      <TypeTicket
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
      />
      {/* <TicketDetail
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
      /> */}

      <CustomButton
        buttonType="medium"
        text={t('confirm')}
        onPress={handleSubmit(handlePostAddTicket)}
        style={{
          width: '70%',
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
