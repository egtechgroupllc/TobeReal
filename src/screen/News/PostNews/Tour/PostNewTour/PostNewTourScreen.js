import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';

import {
  COLORS,
  SHADOW,
  SIZES,
  WIDTH,
  images,
  scale,
} from '../../../../../assets/constants';
import {showMess} from '../../../../../assets/constants/Helper';
import {CustomButton, CustomImage} from '../../../../../components';
import CheckBox from '../../../../../components/CheckBox';
import CustomText from '../../../../../components/CustomText';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {requireField} from '../../../../../utils/validate';

import MainWrapper from '../../../../../components/MainWrapper';

import {postCreateTour, postUpdateTour} from '../../../../../Model/api/apiTour';

import {useNavigation, useRoute} from '@react-navigation/native';
import EstateContact from '../../Lease/components/PostNewLease/EstateContact';
import GeneralInformation from '../components/PostNewTour/GeneralInformation';
import PolicyTour from '../components/PostNewTour/PolicyTour';
import TourPhoto from '../components/PostNewTour/TourPhoto';
import TourSchedule from '../components/PostNewTour/TourSchedule';
import {IconHome} from '../../../../../assets/icon/Icon';
import EstatePhoto from '../../Lease/components/PostNewLease/EstatePhoto';
import {useCountdown} from '../../../../../hooks/useCountdown';
import {useLoading} from '../../../../../hooks/useLoading';
import ModalBookingSuccess from '../../../../Bookings/components/BookingRoom/ContentStep2/ModalBookingSuccess';
import RNRestart from 'react-native-restart';
export default function PostNewTourScreen() {
  const {t} = useLanguage();
  const {navigate, setOptions} = useNavigation();
  const params = useRoute().params;
  const [openContact, setOpenContact] = useState(false);
  const isPending = useRef(false);

  const [check, setCheck] = useState(false);
  const {start, countdown} = useCountdown(5);
  const {stopLoading, setLoading} = useLoading();
  const queryClient = useQueryClient();

  const dataStatusTask = queryClient.getQueryData([
    'common',
    'status-task',
  ])?.data;
  const dataWallet = queryClient.getQueryData([
    'user',
    'wallet',
    'balance',
  ])?.data;
  const dataPioneZero = useMemo(
    () => dataWallet?.find(item => item?.symbol === 'PZO'),
    [dataWallet],
  );
  const dataP = queryClient.getQueryData(['user', 'profile'])?.data;

  useEffect(() => {
    stopLoading();
    return () => {
      return setLoading(true);
    };
  }, []);
  useEffect(() => {
    return setOptions({
      headerTitle: !params?.admin ? t('post_new_tour') : t('edit'),
      // headerLeft: () => (
      //   <TouchableOpacity onPress={() => navigate('PostNewLeaseScreen')}>
      //     <IconGoBack style={{width: scale(20)}} />
      //   </TouchableOpacity>
      // ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    unregister,
    formState: {errors},
  } = useForm();

  const createTourMu = useMutation({
    mutationFn: postCreateTour,
  });
  const updateTourMu = useMutation({
    mutationFn: postUpdateTour,
  });
  const getFormData = (object = {}) => {
    const formData = new FormData();

    Object.keys(object).reduce((item, key) => {
      if (
        !['files', 'schedule', 'refund_fee'].includes(key) &&
        !key.includes('description_day')
      ) {
        item.append(key, object[key]);
      }

      return item;
    }, formData);

    if (object?.image_update_description) {
      const arrImage_descriptionUp = object?.image_update_description?.map(
        image => {
          return {
            id: image?.id,
            description: image?.description,
          };
        },
      );

      formData.append(
        'image_update_description',
        JSON.stringify(arrImage_descriptionUp),
      );
    }

    const arrImage_description = object?.files?.map(image => {
      formData.append('files', image);

      return {
        name: image?.name,
        description: image?.description,
      };
    });

    formData.append('schedule', JSON.stringify(object?.schedule));

    formData.append(
      'refund_fee',
      object?.refund_fee ? object?.refund_fee / 100 : 1,
    );
    object?.files &&
      formData.append(
        'image_description',
        JSON.stringify(arrImage_description),
      );

    return formData;
  };

  const handlePostTour = value => {
    delete value?.check;
    delete value?.admin;
    delete value?.days;
    delete value?.hours;
    // delete value?.description_0;
    const formData = getFormData(value);
    if (!params?.address) {
      setOpenContact(true);
    }
    const mutationConfig = {
      onSuccess: dataInside => {
        if (dataInside?.status) {
          if (!params?.address) {
            isPending.current = true;

            setCheck({
              status: dataInside?.status,
              mess: t(dataInside?.message),
            });
            start();
            setTimeout(
              () => {
                setOpenContact(false);
                reset();
                navigate('NoBottomTab', {
                  screen: 'AddTicketScreen',
                  params: {id: dataInside?.data?.id},
                });
                return;
              },
              dataInside?.status === false ? 3000 : 5000,
            );
          } else {
            showMess(
              t(dataInside?.message),
              dataInside?.status ? 'success' : 'error',
            );
            navigate('NoBottomTab', {
              screen: 'TourManagementScreen',
            });
            queryClient.invalidateQueries(['tour', 'my-list']);
          }
        } else {
          showMess(t(dataInside?.message), 'error');
          setOpenContact(false);
        }
      },
      onError: err => {
        console.log({err});
        showMess(t('an_error_occured'), 'error');
      },
    };
    if (params?.admin) {
      updateTourMu.mutate(
        {data: formData, id_tour: params?.id},
        mutationConfig,
      );
      return;
    }
    setTimeout(() => {
      createTourMu.mutate(formData, mutationConfig);
    }, 1000);
  };

  useEffect(() => {
    if (params?.admin) {
      reset();

      const entries = Object.entries(params);
      const arrKeyno = ['address', 'latitude', 'longitude'];

      entries.map(item => {
        if (!arrKeyno.includes(item[0])) {
          const checkNum = typeof item[1] === 'number';
          setValue(item[0], checkNum ? String(item[1]) : item[1]);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return dataPioneZero?.balance >= 0.01 ? (
    <MainWrapper styleContent={styles.wrapper}>
      <View style={styles.button}>
        <Image
          source={images.rentbuy}
          style={{width: scale(38), height: scale(38)}}
        />
        <CustomText
          textType="medium"
          style={{...styles.text2, marginLeft: scale(20)}}>
          {t('TOUR')}
        </CustomText>
      </View>

      <View>
        <GeneralInformation
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          params={params}
        />
        {/* <EstateDetail
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
        /> */}
        <TourSchedule
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          unregister={unregister}
          params={params}
        />
        <PolicyTour
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          unregister={unregister}
        />
        <EstateContact
          control={control}
          watch={watch}
          errors={errors}
          setValue={setValue}
        />

        <TourPhoto
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          arrImg={params?.images}
        />
      </View>

      {/* <CheckBox
        name="check"
        control={control}
        rules={requireField(t('this_field_required'))}
        text={t('do_you_agree')}
        textStyle={{
          color: COLORS.black,
          fontSize: SIZES.xSmall,
          flex: 0,
        }}
        styleWrapper={{
          alignItems: 'center',
        }}
      /> */}
      <ModalBookingSuccess
        openContact={openContact}
        isPending={isPending}
        check={check}
        countdown={countdown}
        isFirstTime={dataStatusTask?.is_received_airdrop_today}
      />
      <CustomButton
        buttonType="medium"
        text={t('confirm')}
        onPress={handleSubmit(handlePostTour)}
        style={{
          marginTop: scale(20),
          width: '70%',
        }}
        // disabled={createTourMu.isPending}
      />
    </MainWrapper>
  ) : (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: scale(50),
        rowGap: scale(50),
      }}>
      {dataP?.wallet_address ? (
        <CustomText
          style={{
            fontSize: SIZES.xLarge,
          }}
          textType="bold">
          {t('faucet_now')}
        </CustomText>
      ) : (
        <CustomText
          style={{
            fontSize: SIZES.xLarge,
          }}
          textType="bold">
          {t('create_wallet')}
        </CustomText>
      )}
      <CustomImage
        source={images.logoPione}
        style={{width: scale(150), height: scale(150)}}
      />
      {dataP?.wallet_address ? (
        <CustomText
          style={{
            fontSize: SIZES.xMedium,
            textAlign: 'center',
          }}
          textType="bold">
          {t('your_balance_fee_gas_not_enough', {unit: 'PZO'})}
        </CustomText>
      ) : (
        <CustomText
          style={{
            fontSize: SIZES.xMedium,
            textAlign: 'center',
            width: scale(300),
          }}
          textType="bold">
          {t('please_create_wallet_to_received_reward')}
        </CustomText>
      )}
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(20),
          marginTop: scale(50),
        }}>
        <CustomButton
          text={t('reload')}
          buttonType="medium"
          styleWrapper={{width: '40%'}}
          style={{backgroundColor: COLORS.grey}}
          onPress={() => {
            RNRestart.restart();
          }}
        />
        {dataP?.wallet_address ? (
          <CustomButton
            text={t('faucet_now')}
            buttonType="medium"
            styleWrapper={{width: '50%'}}
            onPress={() =>
              Linking.openURL('https://dex.pionechain.com/testnet/faucet')
            }
          />
        ) : (
          <CustomButton
            text={t('create_wallet')}
            buttonType="medium"
            styleWrapper={{width: '50%'}}
            onPress={() => {
              navigate('NavigateWalletToken', {screen: 'AddressWalletScreen'});
            }}
          />
        )}
      </View>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: WIDTH.widthContain,
    alignItems: 'center',
    marginVertical: scale(30),
    rowGap: scale(20),
    alignSelf: 'center',
    paddingBottom: scale(100),
  },
  contactHeader: {
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    paddingHorizontal: scale(20),
    paddingVertical: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(20),
    width: '100%',
  },
  button: {
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

  text2: {
    fontSize: SIZES.medium,
  },
});
