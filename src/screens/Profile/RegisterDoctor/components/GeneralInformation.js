import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Input from '~/components/Input';
import {useLanguage} from '~/hooks/useLanguage';
import {COLORS, SIZES} from '~/assets/constants';
import {requireField} from '~/utils/validate';
import BottomSheet from '~/components/BottomSheet';
import {scale} from '~/utils/scale';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import Collapsible from 'react-native-collapsible';
import {Button} from '~/components';
import {useNavigation} from '@react-navigation/native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getProfile} from '~/api/user';

export default function GeneralInformation({
  control,
  errors,
  watch,
  setValue,
  onSelect,
}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const [dataSpecialty, setDataSpecialty] = useState([]);
  const [dataFacility, setDataFacility] = useState([]);

  const [isView, setView] = useState(false);

  const arrKeywords = useRef([
    'medical_facility_id',
    'description',
    'array_specialty_id',
  ]).current;
  const viewGeneral = () => {
    setView(prev => !prev);
  };
  useEffect(() => {
    dataSpecialty?.length > 0 && setValue('array_specialty_id', dataSpecialty);
    dataFacility?.length > 0 &&
      setValue('medical_facility_id', dataFacility?.[0]?.id);
    onSelect && onSelect(dataFacility?.[0]?.name);
  }, [dataSpecialty, dataFacility]);
  useEffect(() => {
    if (watch('medical_facility_id') !== 'other' && dataFacility?.length > 0) {
      setValue('medical_facility_name', dataFacility?.[0]?.name);
    } else {
      setValue('medical_facility_name', '');
    }
  }, [dataFacility, watch('medical_facility_id')]);

  return (
    <View>
      <ButtonTabValidate
        title={t('general_information')}
        onPress={viewGeneral}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />

      <Collapsible collapsed={!isView} style={styles.box}>
        <View style={{rowGap: scale(15), width: '100%'}}>
          <Input
            label={t('full_name')}
            control={control}
            name="fullname"
            placeholder={t('enter_fullname')}
            rules={[requireField(t('this_field_required'))]}
            styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
            style={styles.textInput}
            sizeInput="medium"
            styleTextLabel={styles.styleLabel}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
          />
          <Input
            label={t('phone')}
            control={control}
            name="phone"
            placeholder={t('enter_phone')}
            rules={[requireField(t('this_field_required'))]}
            style={styles.textInput}
            styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
            sizeInput="medium"
            styleTextLabel={styles.styleLabel}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
            keyboardType="numeric"
          />
          <Input
            label={t('address')}
            control={control}
            name="address"
            placeholder={t('enter_address')}
            style={styles.textInput}
            styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
            sizeInput="medium"
            rules={[requireField(t('this_field_required'))]}
            styleTextLabel={styles.styleLabel}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
          />
          <Input
            label={t('Description')}
            control={control}
            name="description"
            placeholder={t('enter_description_introducing_yourself')}
            rules={[requireField(t('this_field_required'))]}
            style={styles.textInput}
            styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
            sizeInput="medium"
            styleTextLabel={{...styles.styleLabel, textType: 'bold'}}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
            multiline
          />
          <Button
            title={
              dataSpecialty?.length > 0
                ? `${t('selected')} ${dataSpecialty?.length} ${t(
                    'specialties',
                  )}`
                : t('choose_specialty')
            }
            backgroundColor={
              dataSpecialty?.length > 0 ? COLORS.bluecyan : COLORS.input
            }
            sizeButton="normal"
            onPress={() => {
              navigate('NoBottomTab', {
                screen: 'ListSpecialtyScreen',
                params: {
                  onGoBack: value => {
                    setDataSpecialty(value);
                  },
                  dataSpecialty,
                },
              });
            }}
          />
          <Button
            title={
              dataFacility?.length > 0
                ? `${t('selected')} ${dataFacility?.length} ${t('facility')}`
                : t('choose_facility')
            }
            backgroundColor={
              dataFacility?.length > 0 ? COLORS.bluecyan : COLORS.input
            }
            sizeButton="normal"
            onPress={() => {
              navigate('NoBottomTab', {
                screen: 'ListFacilityScreen',
                params: {
                  onGoBack: value => {
                    setDataFacility(value);
                  },
                },
              });
            }}
          />
          <Input
            label={t('work_place')}
            control={control}
            name="medical_facility_name"
            placeholder={t('enter_work_place')}
            value={
              watch('medical_facility_id') === 'other'
                ? ''
                : dataFacility?.[0]?.name
            }
            style={styles.textInput}
            styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
            sizeInput="medium"
            rules={[requireField(t('this_field_required'))]}
            styleTextLabel={styles.styleLabel}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
          />
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    borderRadius: scale(6),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    borderColor: COLORS.input,
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
  textInput: {
    backgroundColor: COLORS.grey,
    borderWidth: 0,
  },
  styleLabel: {
    fontSize: SIZES.xMedium,
  },
});
