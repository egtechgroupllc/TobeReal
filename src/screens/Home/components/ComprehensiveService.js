import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ListCareServices} from './ListCareServices';
import {scale} from '~/utils/scale';
import {COLORS, SIZES} from '~/assets/constants';
import {CImage, CText} from '~/components';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '~/hooks/useLanguage';

export default function ComprehensiveServices() {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  return (
    <View style={{rowGap: scale(10), paddingBottom: scale(20)}}>
      <CText
        textType="bold"
        style={{
          color: COLORS.White,
          fontSize: SIZES.medium,

          paddingHorizontal: scale(15),
        }}>
        {t('comprehensive_services')}
      </CText>
      <FlatList
        data={ListCareServices}
        keyExtractor={(_, index) => `key-list-history${index}`}
        numColumns={2}
        columnWrapperStyle={{
          columnGap: scale(10),
          paddingBottom: scale(10),
        }}
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: scale(20),
          flex: 1,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigate('NoBottomTab', {
                    screen: 'DetailSpecialtyScreen',
                    params: item,
                  });
                }}
                // onPress={() => handleDetail(item)}
                style={{
                  height: scale(80),
                  width: scale(175),
                  backgroundColor: COLORS.input,
                  columnGap: scale(10),
                  borderRadius: scale(5),
                  paddingHorizontal: scale(10),
                  paddingVertical: scale(15),
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <CImage
                  source={item?.icon}
                  resizeMode="contain"
                  style={{
                    height: scale(40),
                    width: scale(40),
                  }}
                />
                <CText
                  textType="bold"
                  numberOfLines={2}
                  style={{
                    color: COLORS.White,
                    fontSize: SIZES.small,
                    flex: 1,
                  }}>
                  {t(item?.title)}
                </CText>
              </TouchableOpacity>
            </>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
