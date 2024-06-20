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
import {
  Counter,
  CustomInput,
  CustomSelectDropdown,
  CustomText,
  InViewport,
} from '../../../../../../components';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {requireField} from '../../../../../../utils/validate';
import ButtonTabValidate from '../ButtonTabValidate';
import RealEstateType from '../../../components/RealEstateType';
import InputPriceRoom from './InputPriceRoom';
const list = [...Array(17)].map((_, index) => (index === 0 ? '< 1' : index));

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

      <InViewport noLoading={true}>
        <Collapsible collapsed={!viewDetail} style={styles.box}>
          <RealEstateType
            label={t('room_type')}
            name={'room_type_id'}
            control={control}
            data={data?.data}
            watch={watch}
            value={watch('room_type_id')}
            valueFind="id"
          />
          <RealEstateType
            label={t('bed_type')}
            name={'room_bed_type_id'}
            control={control}
            data={listBedType.data?.data}
            watch={watch}
            value={watch('room_bed_type_id')}
            valueFind="id"
          />

          <View style={styles.line} />

          <View
            style={{
              flexDirection: 'row',
              columnGap: scale(30),
            }}>
            <CustomInput
              label={`${t('width')} (m)`}
              placeholder="Width"
              name="size_width"
              rules={requireField(t('this_field_required'))}
              styleWrapper={{
                flex: 1,
              }}
              control={control}
              style={styles.textInput}
              styleText={styles.textInput}
              keyboardType="numeric"
            />

            <CustomInput
              label={`${t('length')} (m)`}
              placeholder="Length"
              name="size_length"
              control={control}
              rules={requireField(t('this_field_required'))}
              styleWrapper={{
                flex: 1,
              }}
              style={styles.textInput}
              styleText={styles.textInput}
              keyboardType="numeric"
            />
          </View>
          <CustomInput
            label={t('number_room')}
            placeholder={t('number_room')}
            name="number_room"
            control={control}
            rules={requireField(t('this_field_required'))}
            style={styles.textInput}
            styleText={styles.textInput}
            keyboardType="numeric"
          />

          <Counter
            heading={t('maximum_adult')}
            min={1}
            max={20}
            value={watch('max_occupancy')}
            onChange={value => {
              setValue('max_occupancy', value);
            }}
          />
          <Counter
            heading={t('maximum_children')}
            min={0}
            max={20}
            value={watch('max_child_occupancy')}
            onChange={value => {
              setValue('max_child_occupancy', value);
              !watch('max_child_age') && setValue('max_child_age', 6);
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: scale(20),
              justifyContent: 'space-between',
            }}>
            <CustomText size={SIZES.xMedium} style={{flex: 1}}>
              {t('maximum_age_children')}
            </CustomText>

            <CustomSelectDropdown
              data={list}
              defaultValueByIndex={watch('max_child_age') || 6}
              defaultValue={watch('max_child_age') || 6}
              onSelect={(selectedItem, i) => {
                setValue('max_child_age', selectedItem);
              }}
              styleWrapper={{
                flex: 0.6,
              }}
            />
          </View>

          <View style={styles.line} />

          <InputPriceRoom
            control={control}
            priceValue={watch('price')}
            currencyValue={watch('currency_id')}
            setValue={setValue}
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
});
