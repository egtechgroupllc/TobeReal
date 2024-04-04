/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';

import {getListDirection} from '../../../../../../Model/api/common';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {CustomInput} from '../../../../../../components';
import CheckBox from '../../../../../../components/CheckBox';
import InViewPort from '../../../../../../components/InViewport';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {requireField} from '../../../../../../utils/validate';
import ButtonTabValidate from '../../../Lease/components/ButtonTabValidate';
import RealEstateType from '../../../components/RealEstateType';
import SelectCurrency from '../../../components/SelectCurrency';

const listLegalDoc = [
  {
    id: 1,
    name: 'Red Book / Pink Book',
  },
  {
    id: 2,
    name: 'Sales Contract',
  },
  {
    id: 3,
    name: 'Deposit Agreement',
  },
  {
    id: 4,
    name: 'Awaiting Title Deed',
  },
];

const listInterior = [
  {
    id: 1,
    name: 'Fully Furnished',
  },
  {
    id: 2,
    name: 'High-end Furnishings',
  },
  {
    id: 3,
    name: 'Basic Finishes',
  },
  {
    id: 4,
    name: 'Unfurnished',
  },
];

export default function EstateDetail({control, errors, watch, setValue}) {
  const {t} = useLanguage();

  const [viewDetail, setViewDetail] = useState(false);

  const arrKeywords = useRef([
    'currency_id',
    'direction_main',
    'size',
    'price',
    'legal_documents',
    'furnish',
  ]).current;

  const {data} = useQuery({
    queryKey: ['common', 'list-direction'],
    queryFn: getListDirection,
  });

  useEffect(() => {
    if (watch('is_negotiated') || watch('is_negotiated') === false) {
      setValue('is_negotiated', watch('is_negotiated') ? 1 : 0);
    }
  }, [watch('is_negotiated')]);

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
          <View style={{flexDirection: 'row', columnGap: scale(10)}}>
            <RealEstateType
              label={'Hướng cửa chính'}
              data={data?.data}
              name={'direction_main_id'}
              control={control}
              styleWrapper={styles.buttonStyle}
              watch={watch}
              valueEdit={{name: watch('direction_main')}}
            />
            {/* watch('estate_type') */}
            {/* <RealEstateType
              label={'Hướng ban công'}
              data={data?.data}
              name={'room_type_id1'}
              control={control}
              styleWrapper={styles.buttonStyle}
              watch={watch}
            /> */}
          </View>

          <View style={{flexDirection: 'row', columnGap: scale(10)}}>
            <RealEstateType
              label={'Giấy tờ pháp lý'}
              name={'legal_documents'}
              control={control}
              data={listLegalDoc}
              styleWrapper={styles.buttonStyle}
              getKeyValue="name"
              watch={watch}
              valueEdit={{name: watch('legal_documents')}}
            />

            <RealEstateType
              label={'Nội thất'}
              name={'furnish'}
              control={control}
              data={listInterior}
              styleWrapper={styles.buttonStyle}
              getKeyValue="name"
              watch={watch}
              valueEdit={{name: watch('furnish')}}
            />
          </View>

          <View style={styles.line} />

          <CustomInput
            label={t('Diện tích (m²)')}
            styleTextLabel={styles.label}
            control={control}
            name="size"
            defaultValue={watch('size') && String(watch('size'))}
            placeholder={'M²'}
            rules={requireField(t('this_field_required'))}
            style={{...styles.textInput}}
            keyboardType="numeric"
          />

          {/* 
          <Counter heading={'Số phòng'} min={0} max={255} />

          <Counter heading={'Số phòng tắm, vệ sinh'} min={0} max={255} /> */}

          <View style={styles.line} />

          <SelectCurrency control={control} setValue={setValue} watch={watch} />

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

          <CheckBox
            text="Giá có thể thoả thuận"
            styleWrapper={{
              width: '100%',
            }}
            checkedNumber
            control={control}
            name="is_negotiated"
            isChecked={!!watch('is_negotiated')}
            isRadio
            defaultValue={0}
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
  buttonStyle: {
    flex: 1,
  },
});
