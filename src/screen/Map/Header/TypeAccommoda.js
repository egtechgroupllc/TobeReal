import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import WrapperContent from '../../Explore/components/WrapperContent';
import CheckBox from '../../../components/CheckBox';
import CustomText from '../../../components/CustomText';
import {useLanguage} from '../../../hooks/useLanguage';
import {useQuery} from '@tanstack/react-query';
import {getListTypeRent} from '../../../Model/api/common';

export default function TypeAccommoda({onType, value}) {
  const {t} = useLanguage();
  const [checked, setChecked] = useState(value || undefined);
  const {data} = useQuery({
    queryKey: ['common', 'accommodation', 'list-type'],
    queryFn: () => getListTypeRent(),
  });
  useEffect(() => {
    !value && data?.data?.[0]?.id && setChecked(data?.data?.[0]?.id);
  }, [data?.data?.[0]?.id, value]);

  return (
    <WrapperContent
      heading={t('Type accommodation')}
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
      {data?.data?.map((item, index) => (
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
            item && onType && onType(item);
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
