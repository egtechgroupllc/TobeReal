/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';

import {
  getListTypeBed,
  getListTypeRoom,
} from '../../../../../../Model/api/apiAccom';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {CustomInput} from '../../../../../../components';
import CustomSelectDropdown from '../../../../../../components/CustomSelectDropdown';
import CustomText from '../../../../../../components/CustomText';
import InViewPort from '../../../../../../components/InViewport';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {requireField} from '../../../../../../utils/validate';
import SelectCurrency from '../../../components/SelectCurrency';
import ButtonTabValidate from '../ButtonTabValidate';
import RealEstateType from '../../../components/RealEstateType';

export default function EstateDetail({control, errors, watch, setValue}) {
  const {t} = useLanguage();

  const [viewDetail, setViewDetail] = useState(false);

  const {data, isLoading, isError} = useQuery({
    queryKey: ['accommodation', 'room', 'list-type'],
    queryFn: getListTypeRoom,
  });

  const listBedType = useQuery({
    queryKey: ['accommodation', 'room', 'list-bed-type'],
    queryFn: getListTypeBed,
  });

  const arrKeywords = useRef([
    'currency_id',
    'room_type_id',
    'room_bed_type_id',
    'size',
    'price',
  ]).current;

  return (
    <View>
      <ButtonTabValidate
        title={t('estate_detail')}
        onPress={() => setViewDetail(prev => !prev)}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />

      <InViewPort noLoading={true}>
        <Collapsible collapsed={!viewDetail} style={styles.box}>
          <RealEstateType
            label={'Room Type'}
            name={'room_type_id'}
            control={control}
            data={data?.data}
            watch={watch}
            setValue
          />
          <RealEstateType
            label={'Bed Type'}
            name={'room_bed_type_id'}
            control={control}
            data={listBedType.data?.data}
            watch={watch}
          />

          <View style={styles.line} />

          <CustomInput
            label={t('Room Size (m²)')}
            styleTextLabel={styles.label}
            control={control}
            name="size"
            placeholder={'M²'}
            rules={requireField(t('this_field_required'))}
            style={{...styles.textInput}}
            keyboardType="numeric"
          />
          <View style={styles.line} />

          <SelectCurrency
            control={control}
            // onChange={value => {
            //   setValue('currency_id', value?.id);
            // }}
          />

          <CustomInput
            label={t('price')}
            styleTextLabel={styles.label}
            control={control}
            name="price"
            placeholder={t('enter_price')}
            rules={requireField(t('this_field_required'))}
            style={{...styles.textInput}}
            keyboardType="number-pad"
            enableFormatNum
          />
        </Collapsible>
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
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
  line: {
    borderWidth: 0.5,
    width: '100%',
    marginTop: scale(10),
    borderColor: '#F0B90B',
  },

  textInput: {
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    borderRadius: scale(6),
  },
});
