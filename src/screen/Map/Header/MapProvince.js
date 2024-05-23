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
        placeholder={nameProvince || 'Search more'}
        style={{
          backgroundColor: '#f5f5f5',
          borderWidth: 1,
          borderColor: COLORS.grey,
          height: scale(30),
        }}
        onPress={onSearch}
      />
      {data?.data?.data?.slice(0, 6)?.map((item, index) => (
        // <CheckBox
        //   key={index}
        //   textLeft
        //   defaultValue={checked === index}
        //   text={<CustomText>{item?.name}</CustomText>}
        //   style={{
        //     justifyContent: 'space-between',
        //     paddingVertical: scale(5),
        //   }}
        //   onPress={e => onType && onType(index)}
        // />
        <TouchableOpacity
          onPress={e => {
            item && onProvince && onProvince(item);
            setChecked(item?.id);
          }}
          activeOpacity={0.7}
          key={index}
          style={{
            borderWidth: 1,
            minWidth: '47%',
            borderRadius: 99,
            alignItems: 'center',
            borderColor: checked === item?.id ? COLORS.primary : '#ccc',
            backgroundColor: checked === item?.id ? COLORS.primary : '#fff',
          }}>
          <CustomText
            style={{
              padding: scale(6),
              textAlign: 'center',
              color: checked === item?.id ? COLORS.white : COLORS.black,
            }}>
            {item?.name}
          </CustomText>
        </TouchableOpacity>
      ))}
    </WrapperContent>
  );
}

const styles = StyleSheet.create({});
