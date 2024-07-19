import {useQuery} from '@tanstack/react-query';
import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Collapsible from 'react-native-collapsible';

import {getListTypeEstateSell} from '../../../../../../Model/api/common';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {CustomInput, CustomText} from '../../../../../../components';
import InViewPort from '../../../../../../components/InViewport';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {
  requireField,
  validateMaxLengthText,
} from '../../../../../../utils/validate';
import ButtonTabValidate from '../../../Lease/components/ButtonTabValidate';
import EstateSetMap from '../../../Lease/components/PostNewLease/GeneralInformation/EstateSetMap';
import SelectCountry from '../../../components/SelectCountry';
import InputLeaseMulti from '../../../Lease/components/PostNewLease/GeneralInformation/InputLeaseMulti';

export default function GeneralInformation({
  maxCharacters,
  control,
  setValue,
  watch,
  errors,
  params,
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
    'estate_type_id',
  ]).current;

  return (
    <View>
      <ButtonTabValidate
        title={t('tour_information')}
        onPress={viewGeneral}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />

      <InViewPort noLoading={true}>
        <Collapsible collapsed={!isView} style={styles.box}>
          <InputLeaseMulti
            label={t('title')}
            name="name"
            control={control}
            // editable={params?.name ? false : true}
            maxLength={100}
            placeholder={t('title')}
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

          {!params?.address && (
            <>
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
                  {t('please_choose_coordinates')}
                </CustomText>
              )}
            </>
          )}

          <View style={styles.line} />

          <SelectCountry setValue={setValue} control={control} watch={watch} />

          {!params?.address && (
            <CustomInput
              styleTextLabel={styles.label}
              label={t('address')}
              control={control}
              name="address"
              placeholder={t('address')}
              rules={requireField(t('this_field_required'))}
              style={styles.textInput}
            />
          )}
        </Collapsible>
      </InViewPort>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: SIZES.xMedium,
    color: COLORS.black,
  },

  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(6),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    borderColor: '#F0B90B80',
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
