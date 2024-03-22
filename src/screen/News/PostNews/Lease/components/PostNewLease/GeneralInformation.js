import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Collapsible from 'react-native-collapsible';

import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {CustomInput} from '../../../../../../components';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {
  requireField,
  validateMaxLengthText,
} from '../../../../../../utils/validate';
import RealEstateType from '../../../components/RealEstateType';
import SelectCountry from '../../../components/SelectCountry';
import ButtonTabValidate from './ButtonTabValidate';
import EstateSetMap from './GeneralInformation/EstateSetMap';
import InViewPort from '../../../../../../components/InViewport';

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
            <CustomInput
              styleTextLabel={styles.label}
              label={t('real_estate_title')}
              control={control}
              name="name"
              multiline
              maxLength={maxCharacters}
              placeholder={t('enter_real_estate_title')}
              rules={[
                requireField(t('this_field_required')),
                validateMaxLengthText(
                  `${maxCharacters} characters limit`,
                  maxCharacters,
                ),
              ]}
              style={[
                styles.textInput,
                {
                  height: scale(60),
                },
              ]}
              componentRight={
                <Text style={styles.numText}>
                  {watch('name')?.length || 0}/{maxCharacters}
                </Text>
              }
            />

            <CustomInput
              styleTextLabel={styles.label}
              label={t('description_content')}
              control={control}
              name="description"
              maxLength={maxCharacters}
              multiline
              placeholder={t('enter_a_description')}
              rules={[
                requireField(t('this_field_required')),
                validateMaxLengthText(
                  `${maxCharacters} characters limit`,
                  maxCharacters,
                ),
              ]}
              style={[
                styles.textInput,
                {
                  height: scale(120),
                },
              ]}
              componentRight={
                <Text style={styles.numText}>
                  {watch('description')?.length || 0}/{maxCharacters}
                </Text>
              }
            />

            <CustomInput
              styleTextLabel={styles.label}
              label={t('address')}
              control={control}
              name="address"
              placeholder={t('address')}
              rules={requireField(t('this_field_required'))}
              style={styles.textInput}
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

            <SelectCountry
              control={control}
              onChange={value => {
                setValue('country_id', value?.id);
                setValue('province_id', value?.province?.id);
              }}
            />

            <View style={styles.line} />

            <RealEstateType
              control={control}
              onChange={value => {
                setValue('accommodation_type_id', value?.id);
              }}
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
    paddingHorizontal: scale(20),
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
