/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';

import {getListDirection} from '../../../../../../Model/api/common';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {
  CheckBox,
  Counter,
  CustomInput,
  InViewport,
} from '../../../../../../components';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {requireField} from '../../../../../../utils/validate';
import ButtonTabValidate from '../../../Lease/components/ButtonTabValidate';
import RealEstateType from '../../../components/RealEstateType';
import SelectCurrency from '../../../components/SelectCurrency';

export default function EstateDetail({control, errors, watch, setValue}) {
  const {t} = useLanguage();
  const listLegalDoc = [
    {
      id: 1,
      name: t('red_book'),
    },
    {
      id: 2,
      name: t('sale_contract'),
    },
    {
      id: 3,
      name: t('deposit_agreement'),
    },
    {
      id: 4,
      name: t('waiting_title'),
    },
  ];

  const listInterior = [
    {
      id: 1,
      name: t('full_furnished'),
    },
    {
      id: 2,
      name: t('high_end'),
    },
    {
      id: 3,
      name: t('basic_furnish'),
    },
    {
      id: 4,
      name: t('unfurnished'),
    },
  ];
  const [viewDetail, setViewDetail] = useState(false);

  const arrKeywords = useRef([
    'currency_id',
    'direction_main',
    'size',
    'price',
    'legal_documents',
    'furnish',
    'size_width',
    'size_length',
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
      <InViewport noLoading={true}>
        <Collapsible collapsed={!viewDetail} style={styles.box}>
          <View style={{flexDirection: 'row', columnGap: scale(10)}}>
            <RealEstateType
              label={t('main_door')}
              data={data?.data}
              name={'direction_main_id'}
              control={control}
              styleWrapper={styles.buttonStyle}
              watch={watch}
              value={watch('direction_main_id')}
              valueFind="id"
            />
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
              label={t('legal_documents')}
              name={'legal_documents'}
              control={control}
              data={listLegalDoc}
              styleWrapper={styles.buttonStyle}
              getKeyValue="name"
              watch={watch}
              value={{name: watch('legal_documents')}}
            />

            <RealEstateType
              label={t('interior')}
              name={'furnish'}
              control={control}
              data={listInterior}
              styleWrapper={styles.buttonStyle}
              getKeyValue="name"
              watch={watch}
              value={{name: watch('furnish')}}
            />
          </View>

          <View style={styles.line} />

          {/* <CustomInput
            label={t('Diện tích (m²)')}
            styleTextLabel={styles.label}
            control={control}
            name="size"
            defaultValue={watch('size') && String(watch('size'))}
            placeholder={'M²'}
            rules={requireField(t('this_field_required'))}
            style={{...styles.textInput}}
            keyboardType="numeric"
          /> */}
          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(30),
            }}>
            <CustomInput
              label={t('width')}
              placeholder="Width"
              name="size_width"
              control={control}
              rules={requireField(t('this_field_required'))}
              styleWrapper={{
                flex: 1,
              }}
              styleTextLabel={styles.label}
              style={styles.textInput}
            />

            <CustomInput
              label={t('length')}
              placeholder="Length"
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

          <Counter
            heading={t('room_number')}
            min={0}
            max={255}
            value={watch('number_bedroom')}
            onChange={value => {
              setValue('number_bedroom', value);
            }}
          />

          <Counter
            heading={t('number_bathroom')}
            min={0}
            max={255}
            value={watch('number_bathroom')}
            onChange={value => {
              setValue('number_bathroom', value);
            }}
          />

          <View style={styles.line} />

          <SelectCurrency control={control} setValue={setValue} watch={watch} />

          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(10),
            }}>
            <CustomInput
              label={t('price')}
              styleTextLabel={styles.label}
              control={control}
              name="price"
              placeholder={t('enter_price')}
              rules={requireField(t('this_field_required'))}
              style={{...styles.textInput}}
              styleWrapper={{
                flex: 1,
              }}
              keyboardType="number-pad"
              enableFormatNum
            />

            <CustomInput
              label={t('price_locking_information')}
              placeholder={t('price_locking_information')}
              name="price_lock"
              control={control}
              editable={false}
              defaultValue="1"
              rules={requireField(t('this_field_required'))}
              styleTextLabel={styles.label}
              styleWrapper={{
                flex: 1,
              }}
              style={styles.textInput}
              keyboardType="number-pad"
              enableFormatNum
            />
          </View>

          <CheckBox
            text={t('price_negotiated')}
            styleWrapper={{
              width: '100%',
            }}
            checkedNumber
            control={control}
            name="is_negotiated"
            isChecked={!!watch('is_negotiated')}
            // isRadio={!!watch('is_negotiated')}
            defaultValue={0}
          />
        </Collapsible>
      </InViewport>
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
