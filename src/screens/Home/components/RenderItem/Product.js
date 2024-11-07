import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getListProduct} from '~/api/product';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {CImage, CText} from '~/components';
import BoxPlaceItemLoading from '~/components/BoxPlaceItemLoading';
import {formatPrice} from '~/utils/format';
import {IconArrowRight} from '~/assets/icon/Icon';
import InViewport from '~/components/Loading/InViewport';
import EmptyData from '~/components/EmptyData';

export default function Product() {
  const {navigate} = useNavigation();

  const onOpenProduct = item => {
    navigate('NoBottomTab', {screen: 'DetailProductScreen', params: item});
  };
  const {data: dataMedicalProduct, isLoading: isLoadingMedicalProduct} =
    useQuery({
      queryKey: [...getListProduct.queryKey, {keyword: ''}],
      queryFn: () => getListProduct({keyword: ''}),
    });
  const renderProduct = ({item, isLoading}) => {
    const dataEx = item?.items[0];
    return !isLoading ? (
      <TouchableOpacity
        style={styles.viewOurNew}
        key={item?.id}
        onPress={() => {
          onOpenProduct(dataEx);
        }}>
        <View
          style={{
            ...styles.viewBorder,
            backgroundColor: COLORS.input,
            width: scale(150),
            height: scale(160),
          }}>
          <CImage
            source={{uri: dataEx?.documents}}
            // source={data?.item?.url}
            style={{
              ...styles.imageDoctor,
              height: scale(60),
            }}
            resizeMode="contain"
          />
          <CText
            numberOfLines={2}
            textType="bold"
            style={{fontSize: SIZES.small, color: COLORS.White, flex: 1}}>
            {dataEx?.name}
          </CText>
          <CText
            numberOfLines={1}
            textType="bold"
            style={{fontSize: SIZES.small, color: COLORS.cyan, flex: 1}}>
            {formatPrice(dataEx?.price)}
          </CText>
        </View>
      </TouchableOpacity>
    ) : (
      <BoxPlaceItemLoading style={styles.viewBorder} />
    );
  };
  return (
    <View style={{rowGap: scale(10)}}>
      <View style={styles.viewRow}>
        <CText style={styles.txtLargeDark} textType="bold">
          Medical products
        </CText>
        {/* <TouchableOpacity
          style={styles.viewRow}
          onPress={() => {
            navigate('NoBottomTab', {screen: 'HomeProductScreen'});
          }}>
          <CText style={styles.txtNmSmbDark}>View all</CText>
          <View style={styles.viewButtonNext}>
            <IconArrowRight />
          </View>
        </TouchableOpacity> */}
      </View>
      <InViewport
        loadingMap
        ComponentLoading={<BoxPlaceItemLoading style={styles.viewBorder} />}>
        <FlatList
          data={
            !isLoadingMedicalProduct ? dataMedicalProduct?.data : [...Array(4)]
          }
          keyExtractor={(_, index) => `key-list-history${index}`}
          horizontal
          contentContainerStyle={{
            columnGap: scale(10),
            paddingHorizontal: scale(20),
            minHeight: scale(100),
            minWidth: '100%',
          }}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<EmptyData />}
          renderItem={({item}) => {
            return renderProduct({
              item,
              isLoading: isLoadingMedicalProduct,
            });
          }}
        />
      </InViewport>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingBottom: scale(100),
    // backgroundColor:'rgba(255, 255, 255, 0.1)'
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingLeft: scale(20),
    paddingRight: scale(5),
  },
  viewOurNew: {
    flexDirection: 'row',
  },
  viewDoctor: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(15),
    marginTop: scale(20),
    marginRight: scale(12),
    width: scale(130),
    height: scale(200),
    borderWidth: 2 * StyleSheet.hairlineWidth,
    borderColor: COLORS.grey,
    marginBottom: scale(40),
  },

  viewButtonNext: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.cyan,
    borderRadius: scale(7),
    width: scale(24),
    height: scale(24),
    marginLeft: scale(10),
  },
  txtLargeDark: {
    color: COLORS.White,
    fontSize: SIZES.medium,
  },
  txtNmSmbDark: {
    fontSize: SIZES.medium,

    color: COLORS.White,
  },
  txtLargeCaptionSmb: {
    fontSize: SIZES.large,

    color: COLORS.White,
  },
  txtLargeCaption: {
    fontSize: SIZES.large,
    color: COLORS.White,
    marginTop: scale(5),
  },
  txtLargeCaptionDot: {
    fontSize: SIZES.large,
    color: COLORS.greyBold,
    position: 'absolute',
    bottom: scale(10),
    right: scale(10),
  },
  image: {
    height: scale(12),
    width: scale(12),
  },
  imageDoctor: {
    width: '100%',
    height: scale(70),
  },
  imageDoctors: {
    width: scale(100),
    height: scale(100),
    marginTop: scale(10),
    borderRadius: scale(100 / 2),
  },
  viewBorder: {
    borderRadius: scale(16),
    marginBottom: scale(20),
    alignItems: 'center',
    width: scale(150),
    height: scale(175),
    rowGap: scale(10),
    padding: scale(10),
  },
});
