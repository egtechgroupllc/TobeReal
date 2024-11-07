import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import CText from '~/components/CText';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import CheckBox from '~/components/CheckBox';
import {StyleSheet} from 'react-native';
import {useLanguage} from '~/hooks/useLanguage';

export default function Status({onChange, styleTitle, styleName, params}) {
  const {t} = useLanguage();
  const listStatus = [
    {
      id: 'AVAILABLE',
      name: t('available'),
    },
    {
      id: 'CLOSED',
      name: t('closed'),
    },
    {
      id: 'FULLY_BOOKED',
      name: t('fully_booked'),
    },
  ];
  const [status, setStatus] = useState(params?.status || listStatus?.[0]?.id);
  useEffect(() => {
    onChange && onChange(status);
  }, [onChange, status]);
  return (
    <View style={{rowGap: scale(10)}}>
      <CText
        style={{fontSize: SIZES.small, ...styleTitle, color: COLORS.White}}
        textType="bold">
        {t('status')}
      </CText>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {listStatus.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => setStatus(item?.id)}
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: scale(10),
              }}>
              <CText style={[styles.name, styleName]}>{item?.name}</CText>
              <CheckBox
                key={index}
                textBold
                isRadio
                // text={item}
                isChecked={status === item?.id}
                onPress={() => setStatus(item?.id)}
                textStyle={{
                  fontSize: SIZES.xMedium,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  name: {color: COLORS.White, fontSize: SIZES.medium},
});
