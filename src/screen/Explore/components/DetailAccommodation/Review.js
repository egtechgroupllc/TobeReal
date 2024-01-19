import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WrapperContent from '../WrapperContent';
import {COLORS, SHADOW, SIZES, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import CustomImage from '../../../../components/CustomImage';
import Star from '../../../../components/Star';

export default function Review() {
  return (
    <WrapperContent
      isSeeAll
      onPressSeeAll={() => console.log(1)}
      heading="Reviews"
      styleContent={
        {
          // paddingHorizontal: scale(16),
        }
      }>
      <View style={styles.overview}>
        <View style={styles.overviewNumberRating}>
          <CustomText textType="bold" style={styles.numberRating}>
            4.5
          </CustomText>
        </View>

        <View
          style={{
            rowGap: scale(3),
          }}>
          <CustomText
            textType="bold"
            style={{fontSize: SIZES.xMedium, color: COLORS.primary}}>
            Overview
          </CustomText>
          <CustomText style={{fontSize: SIZES.xMedium}}>
            146 đánh giá
          </CustomText>
        </View>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[...Array(10)]}
        contentContainerStyle={{
          columnGap: scale(10),
          marginVertical: scale(10),
          paddingHorizontal: scale(16),
        }}
        renderItem={({item, index}) => (
          <View key={`key-${item}-${index}`} style={styles.content}>
            <View style={styles.infoCustomer}>
              <CustomImage
                resizeMode="contain"
                src="https://down-vn.img.susercontent.com/file/sg-11134004-23030-djahbs14w9nv5f_tn"
                style={styles.avatar}
              />
              <View>
                <CustomText
                  textType="semiBold"
                  style={{
                    fontSize: SIZES.xMedium,
                    flex: 1,
                  }}
                  numberOfLines={1}>
                  Tuan Kiet
                </CustomText>

                <Star rating={4.5} />
              </View>
            </View>

            <CustomText
              textType="medium"
              style={{fontSize: SIZES.xMedium}}
              numberOfLines={4}>
              Vị trí trung tâm, nhân viên thân thiện, ăn sáng buffet đầy đủ và
              ngon. Mình rất thích sữa tắm và dầu gội của khách sạn! ngon. Mình
              rất thích sữa tắm và dầu gội của khách sạn! rất thích sữa tắm và
              dầu gội của khách sạn! rất thích sữa tắm và dầu gội của khách sạn!
            </CustomText>

            <CustomText
              textType="regular"
              style={{fontSize: SIZES.small, marginTop: 'auto'}}>
              27-04-2023 21:08
            </CustomText>
          </View>
        )}
      />
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  overview: {
    flexDirection: 'row',
    columnGap: scale(10),
    alignItems: 'center',
    paddingHorizontal: scale(16),
  },
  overviewNumberRating: {
    backgroundColor: COLORS.primary,
    borderRadius: scale(6),
  },
  numberRating: {
    fontSize: SIZES.xMedium,
    color: COLORS.white,
    padding: scale(10),
  },
  content: {
    width: scale(400 / 1.4),
    aspectRatio: 1.8,
    backgroundColor: '#fff',
    ...SHADOW,
    padding: scale(12),
    borderRadius: scale(12),
    rowGap: scale(10),
    marginBottom: scale(2),
  },
  infoCustomer: {
    flexDirection: 'row',
    columnGap: scale(10),
  },
  avatar: {
    width: scale(30),
    aspectRatio: 1,
    borderRadius: 999,
  },
});
