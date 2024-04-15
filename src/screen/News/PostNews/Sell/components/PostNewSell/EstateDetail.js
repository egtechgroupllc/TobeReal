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
    'size_width',
    'size_length',
    'price',
    'legal_documents',
    'furnish',
    'price_lock',
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
              label={'Main door direction'}
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
              label={'Legal documents'}
              name={'legal_documents'}
              control={control}
              data={listLegalDoc}
              styleWrapper={styles.buttonStyle}
              getKeyValue="name"
              watch={watch}
              valueEdit={{name: watch('legal_documents')}}
            />

            <RealEstateType
              label={'Interior'}
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

          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(30),
            }}>
            <CustomInput
              label={'Chiều rộng'}
              placeholder="Chiều rộng"
              placeholderTextColor={COLORS.grey}
              name="size_width"
              rules={requireField(t('this_field_required'))}
              styleWrapper={{
                flex: 1,
              }}
              control={control}
              styleTextLabel={styles.label}
              style={styles.textInput}
            />

            <CustomInput
              label={'Chiều dài'}
              placeholder="Chiều dài"
              placeholderTextColor={COLORS.grey}
              name="size_length"
              control={control}
              rules={requireField(t('this_field_required'))}
              styleTextLabel={styles.label}
              styleWrapper={{
                flex: 1,
              }}
              style={styles.textInput}
            />
          </View>

          {/* 
          <Counter heading={'Số phòng'} min={0} max={255} />

          <Counter heading={'Số phòng tắm, vệ sinh'} min={0} max={255} /> */}

          <View style={styles.line} />

          <SelectCurrency control={control} setValue={setValue} watch={watch} />

          <CustomInput
            label={t('price')}
            placeholderTextColor={COLORS.grey}
            styleTextLabel={styles.label}
            control={control}
            name="price"
            placeholder={t('enter_price')}
            rules={requireField(t('this_field_required'))}
            style={{...styles.textInput}}
            keyboardType="number-pad"
            enableFormatNum
          />
          <CustomInput
            label={t('Price lock')}
            placeholderTextColor={COLORS.grey}
            styleTextLabel={styles.label}
            control={control}
            name="price_lock"
            placeholder={t('enter_price')}
            rules={requireField(t('this_field_required'))}
            style={{...styles.textInput}}
            keyboardType="number-pad"
            enableFormatNum
          />
          <CheckBox
            text="Price can be negotiated"
            styleWrapper={{
              width: '100%',
            }}
            textStyle={{color: COLORS.white}}
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
  buttonStyle: {
    flex: 1,
  },
});
