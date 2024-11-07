import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {scale} from '~/utils/scale';
import {Button, CImage, CText} from '~/components';
import {COLORS, SIZES} from '~/assets/constants';
import {IconDown} from '~/assets/icon/Icon';
import {IconShoppingCart, IconSortDescending} from '@tabler/icons-react-native';
import EmptyData from '~/components/EmptyData';
import {useNavigation} from '@react-navigation/native';
import StarRating from '../../ListProduct/components/StarRating';
import {formatPrice} from '~/utils/format';
import BottomSheet from '~/components/BottomSheet';
import {useLanguage} from '~/hooks/useLanguage';
import CheckBox from '~/components/CheckBox';
const listSort = [
  {
    id: 1,
    name: 'Newest',
  },
  {
    id: 2,
    name: 'Oldest',
  },
  {
    id: 3,
    name: 'Descending price',
  },
  {
    id: 4,
    name: 'Ascending price',
  },
];
export default function ShopProduct({data}) {
  const [sort, setSort] = useState(listSort[0]);
  const {navigate} = useNavigation();
  const handleDetail = data => {
    navigate('NoBottomTab', {screen: 'DetailProductScreen', params: data});
  };
  const bottomSheetSort = useRef();
  const {t} = useLanguage();
  const handleSort = item => {
    setSort(item);
    bottomSheetSort.current.close();
  };
  return (
    <View style={{rowGap: scale(20)}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: scale(10),
          paddingHorizontal: scale(16),
          columnGap: scale(15),
          justifyContent: 'flex-end',
          borderBottomWidth: 1,
          borderColor: COLORS.overlay,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: scale(10),
          }}>
          <Button
            title={sort?.name}
            Icon={IconDown}
            iconRight
            padding={0}
            styleContent={{
              borderRadius: scale(5),
              paddingHorizontal: scale(20),
              maxWidth: scale(120),
              height: scale(30),
              borderWidth: 1,
              borderColor: COLORS.input,
            }}
            styleText={{fontSize: SIZES.small}}
            backgroundColor={COLORS.input}
            onPress={() => bottomSheetSort.current.open()}
          />
        </View>
        <Button
          title="Filter"
          Icon={IconSortDescending}
          padding={0}
          styleContent={{
            paddingHorizontal: 0,
            borderRadius: scale(5),
            minWidth: scale(100),
            height: scale(30),
            borderWidth: 1,
            borderColor: COLORS.input,
          }}
          backgroundColor={COLORS.input}
        />
      </View>
      <View style={{flex: 1, paddingBottom: scale(50)}}>
        <FlatList
          data={data?.items}
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
                      backgroundColor={COLORS.input}
                      iconProps={{fill: 'transparent'}}
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
      <BottomSheet
        ref={bottomSheetSort}
        index={1}
        snapPoints={['40%', '60%']}
        titleIndicator={t('Sort by')}
        // onDismiss={!apply && reset}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(16),
        }}>
        <View style={{rowGap: scale(10)}}>
          {listSort.map(item => {
            return (
              <TouchableOpacity
                onPress={() => handleSort(item)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: scale(10),
                }}>
                <CheckBox
                  onPress={() => handleSort(item)}
                  isChecked={sort?.id === item?.id}
                />
                <View
                  key={item.id}
                  style={{
                    padding: scale(10),
                  }}>
                  <CText>{item.name}</CText>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({});
