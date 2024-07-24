import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import {CustomText} from '../../../../components';
import {useLanguage} from '../../../../hooks/useLanguage';
import WrapperContent from '../../../Explore/components/WrapperContent';

export default function MenubarTour({onType, value}) {
  const {t} = useLanguage();
  const [checked, setChecked] = useState(value || undefined);

  const data = [
    {
      id: 'DOMESTIC',
      name: t('domestic'),
    },
    {
      id: 'WORLD',
      name: t('world'),
    },
  ];
  useEffect(() => {
    !value && data[0]?.id && setChecked(data[0]?.id);
  }, [data[0]?.id, value]);

  return (
    <WrapperContent
      styleTextHeading={{
        fontSize: SIZES.xMedium,
      }}
      styleContent={{
        alignSelf: 'center',
        gap: scale(8),
        alignItem: 'center',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      {data?.map((item, index) => (
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
            minWidth: '40%',
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
              textTransform: 'uppercase',
            }}>
            {item?.name}
          </CustomText>
        </TouchableOpacity>
      ))}
    </WrapperContent>
  );
}

const styles = StyleSheet.create({});
