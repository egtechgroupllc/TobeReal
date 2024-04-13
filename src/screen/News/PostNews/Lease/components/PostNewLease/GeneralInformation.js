import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Collapsible from 'react-native-collapsible';

import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {CustomInput} from '../../../../../../components';
import InViewPort from '../../../../../../components/InViewport';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {
  requireField,
  validateMaxLengthText,
} from '../../../../../../utils/validate';
import RealEstateType from '../../../components/RealEstateType';
import SelectCountry from '../../../components/SelectCountry';
import ButtonTabValidate from '../ButtonTabValidate';
import EstateSetMap from './GeneralInformation/EstateSetMap';
import {useQuery} from '@tanstack/react-query';
import {getListTypeRent} from '../../../../../../Model/api/common';

export default function GeneralInformation({
  maxCharacters,
  control,
  setValue,
  watch,
  errors,
}) {
  const {t} = useLanguage();

  const [isView, setView] = useState(false);
  const [isRender, setIsRender] = useState(false);

  const viewGeneral = () => {
    setView(prev => !prev);
  };
  const arrKeywords = useRef([
    'name',
    'description',
    'address',
    'latitude',
    'longitude',
    'country_id',
    'province_id',
    'accommodation_type_id',
  ]).current;

  const {data, isLoading, isError} = useQuery({
    queryKey: ['common', 'accommodation', 'list-type'],
    queryFn: getListTypeRent,
  });

  return (
    <View>
      <ButtonTabValidate
        title={t('general_information')}
        onPress={viewGeneral}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />

      <InViewPort
        noLoading={true}
        onChange={render => render && setIsRender(render)}>
        {isRender && (
          <Collapsible collapsed={!isView} style={styles.box}>
            <RealEstateType
              label={t('real_estate_type')}
              name={'accommodation_type_id'}
              control={control}
              data={data?.data}
              watch={watch}
            />
            <View style={styles.line} />

            <CustomInput
              styleTextLabel={styles.label}
              placeholderTextColor={COLORS.grey}
              label={t('real_estate_title')}
              control={control}
              name="name"
              multiline
              maxLength={100}
              placeholder={t('enter_real_estate_title')}
              rules={[
                requireField(t('this_field_required')),
                validateMaxLengthText(`${100} characters limit`, 100),
              ]}
              style={[
                styles.textInput,
                {
                  height: scale(60),
                },
              ]}
              componentRight={
                <Text style={styles.numText}>
                  {watch('name')?.length || 0}/{100}
                </Text>
              }
            />

            <CustomInput
              styleTextLabel={styles.label}
              label={t('description_content')}
              placeholderTextColor={COLORS.grey}
              control={control}
              name="description"
              maxLength={5000}
              multiline
              placeholder={t('enter_a_description')}
              rules={[
                requireField(t('this_field_required')),
                validateMaxLengthText(`${5000} characters limit`, 5000),
              ]}
              style={[
                styles.textInput,
                {
                  height: scale(120),
                },
              ]}
              componentRight={
                <Text style={styles.numText}>
                  {watch('description')?.length || 0}/{5000}
                </Text>
              }
            />

            <View style={styles.line} />

            <EstateSetMap
              control={control}
              onChange={value => {
                setValue('latitude', value?.latitude);
                setValue('longitude', value?.longitude);
              }}
            />

            <View style={styles.line} />

            <SelectCountry setValue={setValue} control={control} />

            <CustomInput
              styleTextLabel={styles.label}
              placeholderTextColor={COLORS.grey}
              label={t('address')}
              control={control}
              name="address"
              placeholder={t('address')}
              rules={requireField(t('this_field_required'))}
              style={styles.textInput}
            />
          </Collapsible>
        )}
      </InViewPort>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: SIZES.small,
    color: COLORS.white,
  },

  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    backgroundColor: COLORS.transparentGrey,
    borderRadius: scale(6),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    borderColor: COLORS.transparentGrey,
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: COLORS.white,
  },

  textInput: {
    backgroundColor: COLORS.transparentGrey,
    borderColor: '#E3E3E3',
    borderRadius: scale(6),
  },
  numText: {
    fontSize: SIZES.small,
    position: 'absolute',
    top: scale(-20),
    right: 0,
    color: COLORS.white,
  },
});
