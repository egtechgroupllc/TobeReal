import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Button, CImage, CText, MainWrapper} from '~/components';
import {COLORS, images} from '~/assets/constants';
import AppointmentHeader from '~/components/AppointmentHeader/AppointmentHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import {scale} from '~/utils/scale';
import EmptyData from '~/components/EmptyData';
import ProductItemLoading from './components/ProductItemLoading';
import {IconHome} from '~/assets/icon/Icon';

export default function SeeAllShopScreen() {
  const params = useRoute().params;
  const {navigate} = useNavigation();
  const handleDetail = data => {
    navigate('NoBottomTab', {screen: 'DetailShopScreen', params: data});
  };
  return (
    <MainWrapper
      scrollEnabled={false}
      sourceImage={images.backgroundHome}
      headerTitle={params?.name}
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
      <View style={{flex: 1}}>
        <AppointmentHeader search />
        <FlatList
          data={params?.items?.slice(0, 4)}
          keyExtractor={(_, index) => `key-list-history${index}`}
          numColumns={2}
          contentContainerStyle={{
            alignItems: 'center',
            columnGap: scale(10),
            paddingHorizontal: scale(20),
            minWidth: '100%',
            rowGap: scale(10),
          }}
          columnWrapperStyle={{
            columnGap: scale(10),
          }}
          ListEmptyComponent={<EmptyData />}
          renderItem={({item}) => {
            return (
              <>
                {!params?.isLoading ? (
                  <TouchableOpacity
                    onPress={() => handleDetail(item)}
                    style={{
                      width: scale(175),
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
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
