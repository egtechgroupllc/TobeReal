import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Button, CImage, CText, MainWrapper} from '~/components';
import {COLORS, images} from '~/assets/constants';
import AppointmentHeader from '~/components/AppointmentHeader/AppointmentHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import {scale} from '~/utils/scale';
import EmptyData from '~/components/EmptyData';
import StarRating from './components/StarRating';
import {formatPrice} from '~/utils/format';
import {IconShoppingCart} from '@tabler/icons-react-native';
import {IconHome} from '~/assets/icon/Icon';

export default function SeeAllProductScreen() {
  const params = useRoute().params;
  console.log('SeeAllProductScreen params:', params);
  const {navigate, goBack} = useNavigation();
  const handleDetail = data => {
    navigate('NoBottomTab', {screen: 'DetailProductScreen', params: data});
  };
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      headerTitle={params?.name}
      scrollEnabled={false}
      optionsHeader={{
        headerTitleStyle: {
          textAlign: 'left',
        },
        headerStyle: {
          paddingBottom: 0,
        },
        headerRight: () => {
          return (
            <Button.Icon
              Icon={IconHome}
              color={COLORS.White}
              onPress={() => navigate('BottomTab')}
            />
          );
        },
      }}>
      <View style={{flex: 1, paddingBottom: scale(50)}}>
        <AppointmentHeader search />
        <FlatList
          data={params?.items}
          keyExtractor={(_, index) => `key-list-history${index}`}
          numColumns={2}
          columnWrapperStyle={{
            columnGap: scale(10),
          }}
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: scale(20),
            rowGap: scale(10),
          }}
          ListEmptyComponent={<EmptyData />}
          renderItem={({item}) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => handleDetail(item)}
                  style={{
                    height: scale(280),
                    width: scale(180),
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
                      backgroundColor={COLORS.cyan}
                      Icon={IconShoppingCart}
                    />
                  </View>
                  <View style={{alignSelf: 'flex-end', paddingRight: scale(5)}}>
                    <CText style={{color: COLORS.grey}}>
                      Sold: {item?.soldItem}3
                    </CText>
                  </View>
                </TouchableOpacity>
              </>
            );
          }}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
