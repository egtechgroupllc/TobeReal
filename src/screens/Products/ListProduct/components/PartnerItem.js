import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale} from '~/utils/scale';
import {useNavigation} from '@react-navigation/native';
import EmptyData from '~/components/EmptyData';
import {CImage, CText} from '~/components';
import {COLORS} from '~/assets/constants';
import PartnerItemLoading from './ProductItemLoading';
import ProductItemLoading from './ProductItemLoading';

export default function PartnerItem({isLoading, data}) {
  const {navigate, goBack} = useNavigation();
  const handleDetail = data => {
    navigate('NoBottomTab', {
      screen: 'DetailShopScreen',
      params: data,
    });
  };
  return (
    <View style={{rowGap: scale(15)}}>
      <FlatList
        data={data?.items?.slice(0, 4)}
        keyExtractor={(_, index) => `key-list-history${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          columnGap: scale(10),
          paddingHorizontal: scale(20),
          minWidth: '100%',
        }}
        ListEmptyComponent={<EmptyData />}
        renderItem={({item}) => {
          return (
            <>
              {!isLoading ? (
                <TouchableOpacity
                  onPress={() => handleDetail(item)}
                  style={{
                    width: scale(140),
                    borderRadius: scale(16),
                    rowGap: scale(10),
                    alignItems: 'center',
                    backgroundColor: COLORS.input,
                    justifyContent: 'center',
                    paddingVertical: scale(20),
                    paddingHorizontal: scale(10),

                    maxHeight: scale(140),
                  }}>
                  <CImage
                    source={{uri: item?.url}}
                    resizeMode="cover"
                    style={{
                      height: scale(80),
                      aspectRatio: 1,
                    }}
                  />
                  <CText
                    style={{color: COLORS.White, textAlign: 'center'}}
                    numberOfLines={2}>
                    {item?.name}
                  </CText>
                </TouchableOpacity>
              ) : (
                <ProductItemLoading />
              )}
            </>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
