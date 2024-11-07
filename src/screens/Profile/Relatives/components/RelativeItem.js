import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale} from '~/utils/scale';
import {Button, CText} from '~/components';
import {COLORS, SIZES} from '~/assets/constants';
import CheckBox from '~/components/CheckBox';
import EmptyData from '~/components/EmptyData';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '~/hooks/useLanguage';

export default function RelativeItem({data, index, onPress, onPressSelect}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  const [userRelative, setUserRelative] = useState();
  useEffect(() => {
    onPressSelect && onPressSelect(userRelative);
  }, [userRelative]);
  return (
    <>
      <FlatList
        data={data}
        contentContainerStyle={{
          paddingVertical: scale(10),
          rowGap: scale(10),
          padding: scale(10),
        }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        ListEmptyComponent={<EmptyData />}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => setUserRelative(item)}
              key={index}
              style={{
                rowGap: scale(5),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <CText
                style={{color: COLORS.White, fontSize: SIZES.medium}}
                textType="semiBold">
                {t(item?.relationship)}
              </CText>
              <CheckBox
                key={index}
                textBold
                isRadio
                // text={item}
                // isChecked={dataPro?.email === item?.email}
                onPress={() => setUserRelative(item)}
                textStyle={{
                  fontSize: SIZES.xMedium,
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
      <Button
        title={t('add_profile')}
        onPress={onPress}
        linearGradientProps={{colors: COLORS.linearButton}}
      />
    </>
  );
}

const styles = StyleSheet.create({});
