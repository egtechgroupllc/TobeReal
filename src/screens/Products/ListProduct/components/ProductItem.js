import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {scale} from '~/utils/scale';
import EmptyData from '~/components/EmptyData';
import {COLORS, SIZES} from '~/assets/constants';
import {Button, CImage, CText} from '~/components';
import {formatPrice} from '~/utils/format';
import {useNavigation} from '@react-navigation/native';
import {useAuthentication} from '~/hooks/useAuthentication';
import {IconShoppingCart} from '@tabler/icons-react-native';
import StarRating from './StarRating';
import PartnerItemLoading from './ProductItemLoading';

export default function ProductItem({data, category, isLoading}) {
  const {navigate, goBack} = useNavigation();
  const handleDetail = data => {
    navigate('NoBottomTab', {screen: 'DetailProductScreen', params: data});
  };
  return (
    <View style={{rowGap: scale(15), alignItems: 'center'}}>
      {/* {category === 'All' && (
        <CText
          style={{
            paddingHorizontal: scale(20),
            color: COLORS.White,
            fontSize: SIZES.large,
          }}
          textType="semiBold">
          {data?.name}
        </CText>
      )} */}
      <FlatList
        data={data?.items?.slice(0, 4)}
        keyExtractor={(_, index) => `key-list-history${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          columnGap: scale(10),
          paddingHorizontal: scale(20),
        }}
        ListEmptyComponent={<EmptyData />}
        renderItem={({item}) => {
          return (
            <>
              {!isLoading ? (
                <TouchableOpacity
                  onPress={() => handleDetail(item)}
                  style={{
                    height: scale(280),
                    width: scale(185),
                    backgroundColor: COLORS.input,
                    borderRadius: scale(16),
                    paddingHorizontal: scale(10),
                    paddingVertical: scale(15),
                    rowGap: scale(10),
                    alignItems: 'center',
                  }}>
                  <CImage
                    source={{uri: item?.url}}
                    resizeMode="contain"
                    style={{
                      height: scale(100),
                      aspectRatio: 1,
                    }}
                  />
                  <CText style={{color: COLORS.White}} numberOfLines={2}>
                    {item?.name}
                  </CText>
                  <StarRating rating={2} />
                  <CText
                    style={{color: COLORS.cyan}}
                    numberOfLines={1}
                    textType="semiBold">
                    {formatPrice(item?.price)}
                  </CText>
                  <View style={{alignSelf: 'center'}}>
                    <Button
                      title="Add to cart"
                      sizeButton="small"
                      Icon={IconShoppingCart}
                      backgroundColor={COLORS.input}
                      iconProps={{fill: 'transparent'}}
                    />
                  </View>
                  <View style={{alignSelf: 'flex-end', paddingRight: scale(5)}}>
                    <CText style={{color: COLORS.grey}}>
                      Sold: {item?.soldItem}3
                    </CText>
                  </View>
                </TouchableOpacity>
              ) : (
                <PartnerItemLoading
                  style={{height: scale(280), width: scale(185)}}
                  otherSke
                />
              )}
            </>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
