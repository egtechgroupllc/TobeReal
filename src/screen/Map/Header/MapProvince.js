/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, TextStyle, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import CustomText from '../../../components/CustomText';
import {useLanguage} from '../../../hooks/useLanguage';
import WrapperContent from '../../Explore/components/WrapperContent';
import {useQuery} from '@tanstack/react-query';
import {useCountry} from '../../../hooks/useCountry';
import {getListCountry} from '../../../Model/api/common';
import {CustomButton, CustomInput} from '../../../components';
import BottomSheet from '../../../components/BottomSheet';
import BottomSheetListSelect from '../../../components/BottomSheetListSelect';
import ReviewAll from '../../Explore/components/DetailAccommodation/Review/ReviewAll';
import {IconSearch} from '../../../assets/icon/Icon';

export default function MapProvince({
  onProvince,
  value,
  control,
  onSearch,
  data,
  nameProvince,
}) {
  const {t} = useLanguage();
  const [checked, setChecked] = useState(value || undefined);

  useEffect(() => {
    nameProvince?.name && setChecked(nameProvince);
  }, [nameProvince?.name]);

  return (
    <WrapperContent
      heading={t('Province')}
      styleWrapper={{marginBottom: scale(-10)}}
      styleHeading={{
        paddingHorizontal: 0,
      }}
      styleTextHeading={{
        fontSize: SIZES.xMedium,
      }}
      styleContent={{
        gap: scale(8),
        alignItem: 'center',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}>
      <CustomInput
        styleText={{color: COLORS.black, alignSelf: 'flex-start'}}
        value={checked?.name}
        placeholder="Select province"
        style={{
          backgroundColor: '#f5f5f5',
          borderWidth: 1,
          borderColor: COLORS.grey,
          height: scale(30),
        }}
        onPress={onSearch}
      />
      {data?.data?.data?.slice(0, 6)?.map((item, index) => (
        <TouchableOpacity
          onPress={e => {
            item && onProvince && onProvince(item);
            setChecked(item);
          }}
          activeOpacity={0.7}
          key={index}
          style={{
            borderWidth: 1,
            minWidth: '47%',
            borderRadius: 99,
            alignItems: 'center',
            borderColor: checked?.id === item?.id ? COLORS.primary : '#ccc',
            backgroundColor: checked?.id === item?.id ? COLORS.primary : '#fff',
          }}>
          <CustomText
            style={{
              padding: scale(6),
              textAlign: 'center',
              color: checked?.id === item?.id ? COLORS.white : COLORS.black,
            }}>
            {item?.name}
          </CustomText>
        </TouchableOpacity>
      ))}
    </WrapperContent>
  );
}

const styles = StyleSheet.create({});
