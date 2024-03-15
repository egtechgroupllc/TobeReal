import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import Collapsible from 'react-native-collapsible';

import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {IconRight} from '../../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../../components';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {requireField, validateMaxAmount} from '../../../../../utils/validate';
import RealEstateType from '../../components/RealEstateType';
import SelectCountry from '../../components/SelectCountry';
import EstateSetMap from './GeneralInformation/EstateSetMap';

export default function GeneralInformation({maxCharacters}) {
  const {control, watch, handleSubmit, setValue, getValues} = useForm();
  const {t} = useLanguage();

  const [isView, setView] = useState(false);

  const viewGeneral = () => {
    setView(prev => !prev);
  };
  useEffect(() => {
    console.log(watch());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch()]);

  return (
    <View>
      <CustomButton
        outline
        style={[styles.buttonCategories]}
        text={t('general_information')}
        iconRight={() => <IconRight />}
        onPress={viewGeneral}
        styleText={{
          color: COLORS.text,
        }}
      />

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
            validateMaxAmount('maxCharacters characters limit', maxCharacters),
          ]}
          style={[
            styles.textInput,
            {
              height: scale(100),
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
            validateMaxAmount(maxCharacters, 'maxCharacters characters limit'),
          ]}
          style={[
            styles.textInput,
            {
              height: scale(100),
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
          onChange={value => {
            setValue('latitude', value?.latitude);
            setValue('longitude', value?.longitude);
          }}
        />

        <View style={styles.line} />

        <SelectCountry
          onChange={value => {
            setValue('country_id', value?.id);
            setValue('province_id', value?.province?.id);
          }}
        />

        <View style={styles.line} />

        <RealEstateType
          onChange={value => {
            setValue('accommodation_type_id', value?.id);
          }}
        />
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: SIZES.small,
    color: COLORS.black,
  },
  buttonCategories: {
    backgroundColor: 'white',
    borderRadius: scale(6),
    borderColor: '#F0B90B80',
    height: scale(50),
    justifyContent: 'space-between',
    marginTop: scale(20),
    paddingHorizontal: scale(20),
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
