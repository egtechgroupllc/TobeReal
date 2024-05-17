import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, StyleSheet, View} from 'react-native';

import {
  COLORS,
  SHADOW,
  SIZES,
  WIDTH,
  images,
  scale,
} from '../../../../../assets/constants';
import {CustomButton} from '../../../../../components';
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

const maxCharacters = 1000;
export default function PostNewSellScreen() {
  const params = useRoute().params;

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

  const handlePostLease = value => {
    console.log(value, 11312321);
    delete value?.check;
    delete value?.direction_main;
    delete value?.estate_type;
    delete value?.country;
    delete value?.currency;
    delete value?.province;

    navigate('PostConfigurationScreen', value);
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

  return (
    <MainWrapper refreshControl={false} styleContent={styles.wrapper}>
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
        linearGradientProps
        buttonType="medium"
        text={t('Next')}
        onPress={handleSubmit(handlePostLease)}
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
  wrapper: {
    width: WIDTH.widthContain,
    alignItems: 'center',
    marginVertical: scale(30),
    rowGap: scale(20),
    alignSelf: 'center',
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
