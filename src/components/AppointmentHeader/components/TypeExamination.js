import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import CText from '~/components/CText';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import CheckBox from '~/components/CheckBox';
import {useLanguage} from '~/hooks/useLanguage';

export default function TypeExamination({
  onChange,
  styleTitle,
  styleName,
  params,
}) {
  const {t} = useLanguage();
  const listType = [
    {
      id: 'OFFLINE',
      name: t('offline'),
    },
    {
      id: 'ONLINE',
      name: t('online'),
    },
    {
      id: 'HOME',
      name: t('home'),
    },
  ];
  const [type, setType] = useState(params?.type || listType?.[0]?.id);
  useEffect(() => {
    onChange && onChange(type);
  }, [onChange, type]);

  return (
    <View style={{rowGap: scale(10)}}>
      <CText
        style={{fontSize: SIZES.small, ...styleTitle, color: COLORS.White}}
        textType="bold">
        {t('type_of_examination')}
      </CText>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {listType.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => setType(item?.id)}
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
                isChecked={type === item?.id}
                onPress={() => setType(item?.id)}
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
