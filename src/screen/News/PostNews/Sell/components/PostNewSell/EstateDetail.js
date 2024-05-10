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
import Counter from '../../../../../../components/Counter';

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
              value={watch('direction_main')}
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
              label={'Giấy tờ pháp lý'}
              name={'legal_documents'}
              control={control}
              data={listLegalDoc}
              styleWrapper={styles.buttonStyle}
              getKeyValue="name"
              watch={watch}
              value={{name: watch('legal_documents')}}
            />

            <RealEstateType
              label={'Nội thất'}
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
              label={'Width'}
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
              label={'Length'}
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
            heading={'Room number'}
            min={0}
            max={255}
            value={watch('number_bedroom')}
            onChange={value => {
              setValue('number_bedroom', value);
            }}
          />

          <Counter
            heading={'Number of bathrooms and toilets'}
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
              label={'Price for locking information'}
              placeholder="Price for locking informationn"
              name="price_lock"
              control={control}
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
            text="Price can be negotiated"
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
