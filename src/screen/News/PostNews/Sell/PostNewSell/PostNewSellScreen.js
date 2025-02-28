import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useForm} from 'react-hook-form';
import {Image, Linking, StyleSheet, View} from 'react-native';

import {
  COLORS,
  SHADOW,
  SIZES,
  WIDTH,
  images,
  scale,
} from '../../../../../assets/constants';
import {CustomButton, CustomImage} from '../../../../../components';
import CheckBox from '../../../../../components/CheckBox';
import CustomText from '../../../../../components/CustomText';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {requireField} from '../../../../../utils/validate';

import {useNavigation, useRoute} from '@react-navigation/native';
import MainWrapper from '../../../../../components/MainWrapper';
import EstateContact from '../../Lease/components/PostNewLease/EstateContact';
import EstatePhoto from '../../Lease/components/PostNewLease/EstatePhoto';
import EstateDetail from '../components/PostNewSell/EstateDetail';
import GeneralInformation from '../components/PostNewSell/GeneralInformation';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import RNRestart from 'react-native-restart';
import {
  postCreateEstatSell,
  postUpdateEstate,
} from '../../../../../Model/api/apiEstate';
import {showMess} from '../../../../../assets/constants/Helper';
import {useCountdown} from '../../../../../hooks/useCountdown';
import ModalBookingSuccess from '../../../../Bookings/components/BookingRoom/ContentStep2/ModalBookingSuccess';
import {useLoading} from '../../../../../hooks/useLoading';
const maxCharacters = 1000;
export default function PostNewSellScreen() {
  const params = useRoute().params;
  const queryClient = useQueryClient();
  const [openContact, setOpenContact] = useState(false);
  const isPending = useRef(false);
  const [check, setCheck] = useState(false);
  const {start, countdown} = useCountdown(5);
  const {t} = useLanguage();
  const {navigate, setOptions} = useNavigation();
  const {stopLoading, setLoading} = useLoading();
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('post_for_sale'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    stopLoading();
    return () => {
      return setLoading(true);
    };
  }, []);
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
  const dataStatusTask = queryClient.getQueryData([
    'common',
    'status-task',
  ])?.data;
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: {errors},
  } = useForm();
  const createEstateSellMu = useMutation({
    mutationFn: postCreateEstatSell,
  });
  const updateEstateMu = useMutation({
    mutationFn: postUpdateEstate,
  });

  const getFormData = (object = {}) => {
    const formData = new FormData();

    Object.keys(object).reduce((item, key) => {
      if (
        key !== 'description_img' &&
        key !== 'kyc' &&
        key !== 'image_update_description_kyc' &&
        key !== 'image_update_description'
      ) {
        item.append(
          key,
          typeof object[key] === 'string'
            ? object[key]
            : JSON.stringify(object[key]),
        );
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

    const arrImage_description = !object?.description_img
      ? []
      : object?.description_img?.map(image => {
          formData.append('description_img', image);

          return {
            name: image?.name,
            description: image?.description,
          };
        });

    const arrImage_Kyc = !object?.kyc
      ? []
      : object?.kyc?.map(image => {
          formData.append('kyc', image);
          return {
            name: image?.name,
            description: image?.description,
          };
        });

    if (object?.kyc || object?.description_img) {
      formData.append(
        'image_description',
        JSON.stringify([...arrImage_description, ...arrImage_Kyc]),
      );
    }

    return formData;
  };
  const checkIsValid = () => {
    // dispatch(
    //   StackActions.replace('NoBottomTab', {
    //     screen: 'AddRoomTypeScreen',
    //     params: {},
    //   }),
    // );
    if (JSON.stringify(errors) !== '{}') {
      showMess(t('please_enter_correct'), 'error');
      // return;
    }

    handleSubmit(handlePostSell)();
  };
  const handlePostSell = value => {
    if (!value?.video_link) {
      delete value?.video_link;
    }
    // delete value?.check;
    // delete value?.direction_main;
    // delete value?.estate_type;
    // delete value?.country;
    // delete value?.currency;
    // delete value?.province;
    if (!params?.address) {
      setOpenContact(true);
    }
    const formData = getFormData(value);

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
                queryClient.invalidateQueries(['estate', 'my-list']);
                navigate('POST', {screen: 'PostNewsScreen'});
              },
              dataInside?.status === false ? 3000 : 5000,
            );
            return;
          } else {
            queryClient.invalidateQueries(['estate', 'my-list']);
            navigate('SellManagementScreen');
          }
        } else {
          showMess(t(dataInside?.message), 'error');
          setOpenContact(false);
        }
      },
      onError: err => {
        console.log({err});
        console.log('====================================');
        console.log(err?.response);
        console.log('====================================');
        showMess(t('an_error_occured'), 'error');
      },
    };

    if (params?.address) {
      updateEstateMu.mutate(
        {data: formData, id_estate: params?.id},
        mutationConfig,
      );
      return;
    }
    setTimeout(() => {
      createEstateSellMu.mutate(formData, mutationConfig);
    }, 1000);
    // params?.title && delete value?.title;
    // navigate('PostConfigurationSellScreen', value);
  };

  useEffect(() => {
    if (params?.address) {
      reset();

      const entries = Object.entries(params);
      const arrKeyno = [
        'status',
        'user_id',
        'createdAt',
        'updatedAt',
        'note',
        'wallet_address',
        'images',
        'active',
        'address',
        'latitude',
        'longitude',
        'slug',
        'id',
        'date_start',
        'package_post_item_number_repost',
        'package_post_item_id_repost',
        'package_post_item',
        'package_post_item_id',
        'direction_main',
        'estate_type',
        'country',
        'province',
        'currency',
        'value',
      ];

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
    <MainWrapper
      refreshControl={false}
      styleContent={styles.wrapper}
      optionsHeader={
        createEstateSellMu.isPending ||
        (updateEstateMu.isPending && {
          headerLeft: () => {},
        })
      }>
      <View style={styles.button}>
        <Image
          source={images.sell}
          style={{width: scale(38), height: scale(38)}}
        />
        <CustomText
          textType="medium"
          style={{...styles.text2, marginLeft: scale(20)}}>
          {t('sell')}
        </CustomText>
      </View>

      <View>
        <GeneralInformation
          maxCharacters={maxCharacters}
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />

        <EstateDetail
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />

        <EstateContact
          control={control}
          watch={watch}
          errors={errors}
          setValue={setValue}
        />

        {/* <EstateRooms /> */}

        <EstatePhoto
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          arrImg={params?.images}
        />
        <ModalBookingSuccess
          openContact={openContact}
          isPending={isPending}
          check={check}
          countdown={countdown}
          isFirstTime={dataStatusTask?.is_received_airdrop_today}
        />
        {/* <PaymentInfo
            control={control}
            setValue={setValue}
            watch={watch}
            errors={errors}
          /> */}
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

      <CustomButton
        // linearGradientProps
        isLoading={createEstateSellMu.isPending || updateEstateMu.isPending}
        buttonType="medium"
        text={!params?.title ? t('post') : t('update')}
        onPress={handleSubmit(checkIsValid)}
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
