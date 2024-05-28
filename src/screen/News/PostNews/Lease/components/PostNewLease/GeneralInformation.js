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
import InputLeaseMulti from './GeneralInformation/InputLeaseMulti';
import CustomText from '../../../../../../components/CustomText';

export default function GeneralInformation({control, setValue, watch, errors}) {
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
              valueFind="id"
              value={watch('accommodation_type_id')}
            />
            <View style={styles.line} />

            <InputLeaseMulti
              label={t('real_estate_title')}
              name="name"
              control={control}
              maxLength={100}
              placeholder={t('enter_real_estate_title')}
            />

            <InputLeaseMulti
              label={t('description_content')}
              name="description"
              control={control}
              maxLength={5000}
              placeholder={t('enter_a_description')}
              styleInput={{
                minHeight: scale(120),
                maxHeight: scale(500),
                height: 'auto',
              }}
            />

            <View style={styles.line} />

            <EstateSetMap
              control={control}
              onChange={value => {
                setValue('latitude', value?.latitude);
                setValue('longitude', value?.longitude);
              }}
              address={watch('address')}
            />
            {!watch('latitude') && (
              <CustomText style={{color: COLORS.error}}>
                Please choose coordinates of your estate in Map!
              </CustomText>
            )}
            <View style={styles.line} />

            <SelectCountry setValue={setValue} control={control} />

            <CustomInput
              styleTextLabel={styles.label}
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
    color: COLORS.black,
  },

  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(6),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    borderColor: COLORS.green,
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#F0B90B',
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
