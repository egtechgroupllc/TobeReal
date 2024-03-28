import {useQuery} from '@tanstack/react-query';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';

import {
  getListTypeBed,
  getListTypeRoom,
} from '../../../../../../Model/api/apiAccom';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {CustomInput} from '../../../../../../components';
import CheckBox from '../../../../../../components/CheckBox';
import Counter from '../../../../../../components/Counter';
import CustomSelectDropdown from '../../../../../../components/CustomSelectDropdown';
import CustomText from '../../../../../../components/CustomText';
import InViewPort from '../../../../../../components/InViewport';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {requireField} from '../../../../../../utils/validate';
import ButtonTabValidate from '../../../Lease/components/ButtonTabValidate';
import SelectCurrency from '../../../components/SelectCurrency';
import RealEstateType from '../../../components/RealEstateType';

const listLegalDoc = [
  {
    id: 1,
    name: 'Sổ đỏ/ Sổ hồng',
  },
  {
    id: 2,
    name: 'Hợp đồng mua bán',
  },
  {
    id: 3,
    name: 'Hợp đồng đặt cọc',
  },
  {
    id: 4,
    name: 'Đang chờ sổ',
  },
];

const listInterior = [
  {
    id: 1,
    name: 'Nội thất đầy đủ',
  },
  {
    id: 2,
    name: 'Nội thất cao cấp',
  },
  {
    id: 3,
    name: 'Hoàn thiện cơ bản',
  },
  {
    id: 4,
    name: 'Không nội thất',
  },
];

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

  const arrKeywords = useRef(['currency_id', 'size', 'price']).current;
  console.log(watch('furnish'), 'furnish');
  console.log(watch('legal_documents'), 'legal_documents');
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
              name={'direction_main'}
              control={control}
              styleWrapper={styles.buttonStyle}
              watch={watch}
            />

            <RealEstateType
              label={'Hướng ban công'}
              data={data?.data}
              name={'room_type_id1'}
              control={control}
              styleWrapper={styles.buttonStyle}
              watch={watch}
            />
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
            />

            <RealEstateType
              label={'Nội thất'}
              name={'furnish'}
              control={control}
              data={listInterior}
              styleWrapper={styles.buttonStyle}
              getKeyValue="name"
              watch={watch}
            />
          </View>

          <View style={styles.line} />

          <CustomInput
            label={t('Diện tích (m²)')}
            styleTextLabel={styles.label}
            control={control}
            name="size"
            placeholder={'M²'}
            rules={requireField(t('this_field_required'))}
            style={{...styles.textInput}}
            keyboardType="numeric"
          />

          <Counter heading={'Số phòng'} min={0} max={255} />

          <Counter heading={'Số phòng tắm, vệ sinh'} min={0} max={255} />

          <View style={styles.line} />

          <SelectCurrency control={control} setValue={setValue} />

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
            control={control}
            name="is_negotiated"
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
