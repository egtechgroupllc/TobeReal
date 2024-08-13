/* eslint-disable react-hooks/exhaustive-deps */
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {
  postCreateEstatSell,
  postUpdateEstate,
} from '../../../../../Model/api/apiEstate';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import {showMess} from '../../../../../assets/constants/Helper';
import {IconGoBack, IconHome} from '../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../components';
import CustomText from '../../../../../components/CustomText';
import MainWrapper from '../../../../../components/MainWrapper';
import AutoPost from '../components/PostConfiguration/AutoPost';
import PostType from '../components/PostConfiguration/PostType';
import {useLanguage} from '../../../../../hooks/useLanguage';
import ModalBookingSuccess from '../../../../Bookings/components/BookingRoom/ContentStep2/ModalBookingSuccess';
import {useCountdown} from '../../../../../hooks/useCountdown';
import {useLoading} from '../../../../../hooks/useLoading';

export default function PostConfigurationSellScreen() {
  const params = useRoute().params;

  const queryClient = useQueryClient();
  const {t} = useLanguage();
  const {goBack, navigate, setOptions, addListener} = useNavigation();
  const {handleSubmit, control, setValue, unregister} = useForm();

  const [dateEnd, setDateEnd] = useState(new Date());

  const [openContact, setOpenContact] = useState(false);
  const isPending = useRef(false);
  const {stopLoading, setLoading} = useLoading();

  const [check, setCheck] = useState(false);
  const {start, countdown} = useCountdown(5);
  useEffect(() => {
    if (!params?.package_post_item_id) {
      stopLoading();
      return () => {
        return setLoading(true);
      };
    }
  }, [params?.package_post_item_id]);
  useEffect(() => {
    return setOptions({
      headerTitle: t('post_configuration'),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigate('POST', {screen: 'PostNewsScreen'})}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const createEstateSellMu = useMutation({
    mutationFn: postCreateEstatSell,
  });
  const updateEstateMu = useMutation({
    mutationFn: postUpdateEstate,
  });

  const filterEmptyValues = object => {
    return Object.fromEntries(
      Object.entries(object).filter(
        ([key, value]) => value !== undefined && value !== null,
      ),
    );
  };
  const processImages = (images = [], formData, key) => {
    return images?.map(image => {
      formData.append(key, image);
      return {name: image.name, description: image.description};
    });
  };

  const getFormData = (object = {}) => {
    const formData = new FormData();

    Object.keys(object).reduce((item, key) => {
      if (
        ![
          'description_img',
          'kyc',
          'id',
          'image_update_description',
          'image_update_description_kyc',
          'image_delete',
        ].includes(key)
      ) {
        formData.append(key, object[key]);
      }

      return item;
    }, formData);

    if (object?.image_delete) {
      formData.append('image_delete', JSON.stringify(object?.image_delete));
    }

    const imageDescription = processImages(
      object?.description_img,
      formData,
      'description_img',
    );

    const imageKyc = processImages(object?.kyc, formData, 'kyc');

    if (object?.kyc || object?.description_img) {
      formData.append(
        'image_description',
        JSON.stringify([...imageDescription, ...imageKyc]),
      );
    }

    if (
      object?.image_update_description &&
      object?.image_update_description_kyc
    ) {
      const arrImage_descriptionUp = object?.image_update_description?.map(
        image => {
          return {
            id: image?.id,
            description: image?.description,
          };
        },
      );

      const arrImage_Kyc_Up = object?.image_update_description_kyc?.map(
        image => {
          return {
            id: image?.id,
            description: image?.description,
          };
        },
      );

      formData.append(
        'image_update_description',
        JSON.stringify([...arrImage_descriptionUp, ...arrImage_Kyc_Up]),
      );
    }

    return formData;
  };
  const handlePostSell = value => {
    delete params?.package_post_item_number_repost;
    delete params?.package_post_item_id_repost;
    delete params?.package_post_item;
    delete params?.date_start;
    delete params?.value;
    const formData = getFormData({...filterEmptyValues(params), ...value});
    if (!params?.package_post_item_id) {
      setOpenContact(true);
    }

    const mutationConfig = {
      onSuccess: dataInside => {
        if (dataInside?.status) {
          if (!params?.package_post_item_id) {
            isPending.current = true;
            setCheck({
              status: dataInside?.status,
              mess: dataInside?.message,
            });
            start();
            setTimeout(
              () => {
                setOpenContact(false);
                queryClient.invalidateQueries(['estate', 'my-list']);
                navigate('SellManagementScreen');
              },
              dataInside?.status === false ? 3000 : 5000,
            );
            return;
          } else {
            showMess(
              dataInside?.message,
              dataInside?.status ? 'success' : 'error',
            );
            queryClient.invalidateQueries(['estate', 'my-list']);
            navigate('SellManagementScreen');
          }
        } else {
          showMess(dataInside?.message, 'error');
          setOpenContact(false);
        }
      },
      onError: err => {
        console.log({err});
      },
    };

    if (params?.package_post_item_id) {
      updateEstateMu.mutate(
        {data: formData, id_estate: params?.id},
        mutationConfig,
      );
      return;
    }
    setTimeout(() => {
      createEstateSellMu.mutate(formData, mutationConfig);
    }, 1000);
  };
  useEffect(() => {
    addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }, []);
  return (
    <View style={{flex: 1}}>
      <MainWrapper
        optionsHeader={{
          gestureEnabled: false,
          headerLeft: () => {},
          headerTitle: t('post_configuration'),
        }}
        refreshControl={false}
        styleContent={{
          rowGap: scale(16),
        }}>
        <View style={styles.content}>
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.large,
              paddingHorizontal: scale(10),
            }}>
            {t('post_configuration')}
          </CustomText>

          <PostType
            control={control}
            setValue={setValue}
            onChangeDateEnd={setDateEnd}
            params={params}
          />
        </View>

        <AutoPost
          setValue={setValue}
          date={dateEnd}
          params={params}
          unregister={unregister}
        />
      </MainWrapper>
      <ModalBookingSuccess
        openContact={openContact}
        isPending={isPending}
        check={check}
        countdown={countdown}
      />
      <View style={styles.footer}>
        <CustomButton
          styleWrapper={{
            alignSelf: 'center',
          }}
          style={{
            width: '35%',
            alignSelf: 'center',
          }}
          text={t('back')}
          outline
          iconLeft={IconGoBack}
          styleIcon={{
            color: COLORS.primary,
          }}
          onPress={goBack}
        />

        <CustomButton
          styleWrapper={{
            alignSelf: 'center',
            flex: 1,
          }}
          style={{
            width: '80%',
            alignSelf: 'center',
          }}
          text={t('submit')}
          onPress={handleSubmit(handlePostSell)}
          disabled={createEstateSellMu.isPending}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    rowGap: scale(20),
    backgroundColor: '#fff',
    padding: scale(10),
    ...SHADOW,
  },
  footer: {
    rowGap: scale(20),
    backgroundColor: '#fff',
    paddingVertical: scale(10),
    ...SHADOW,
    flexDirection: 'row',
    columnGap: scale(20),
    paddingHorizontal: scale(20),
    paddingBottom: scale(60),
  },
});
//
