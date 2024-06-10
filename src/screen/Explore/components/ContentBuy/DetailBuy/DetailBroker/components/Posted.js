import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../../../../components/CustomText';
import {
  COLORS,
  SIZES,
  images,
  scale,
} from '../../../../../../../assets/constants';
import {useQuery} from '@tanstack/react-query';
import {getListSell} from '../../../../../../../Model/api/apiEstate';
import BoxPlaceItem from '../../../BoxPlaceItem';
import {useLanguage} from '../../../../../../../hooks/useLanguage';

// const data = [
//   {
//     id: 1,
//     src: images.c15,
//     name: 'C15_05_BlockC Emerald',
//     price: 25000000,
//     imgdetail: [
//       images.c15_1,
//       images.c15_2,
//       images.c15_3,
//       images.c15_4,
//       images.c15_5,
//       images.c15_6,
//     ],
//   },
//   {
//     id: 2,
//     src: images.c16,
//     name: 'D11.06 Emerald',
//     price: 16000000,
//     imgdetail: [
//       images.c16_1,
//       images.c16_2,
//       images.c16_3,
//       images.c16_4,
//       images.c16_5,
//       images.c16_6,
//       images.c16_7,
//       images.c16_8,
//       images.c16_9,
//     ],
//   },
//   {
//     id: 3,
//     src: images.p14,
//     name: 'P14.07 Diamond',
//     price: 28000000,
//     imgdetail: [
//       images.p14_1,
//       images.p14_2,
//       images.p14_3,
//       images.p14_4,
//       images.p14_5,
//       images.p14_6,
//       images.p14_7,
//       images.p14_8,
//     ],
//   },
//   {
//     id: 4,
//     src: images.q10,
//     name: 'Centrosa Garden Q.10',
//     price: 26000000,
//     imgdetail: [
//       images.q10_1,
//       images.q10_2,
//       images.q10_3,
//       images.q10_4,
//       images.q10_5,
//       images.q10_6,
//     ],
//   },
//   {
//     id: 5,
//     src: images.a6,
//     name: 'A6.7.08 Diamod Alanta Plus',
//     price: 18000000,
//     imgdetail: [
//       images.a6_1,
//       images.a6_2,
//       images.a6_3,
//       images.a6_4,
//       images.a6_5,
//     ],
//   },
// ];
export default function Posted({dataPost}) {
  const {t} = useLanguage();

  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'estate',
      'list-post',
      {
        estate_type_id: 1,
        country_id: 241,
      },
    ],
    queryFn: () => getListSell({country_id: 241}),
  });
  const dataFilter = data?.data?.rows.filter((item, index) => {
    if (item?.contact_name === dataPost?.contact_name) {
      return item;
    }
  });
  return (
    <View style={styles.container}>
      <CustomText
        textType="bold"
        style={{
          fontSize: SIZES.medium,
          color: COLORS.white,
        }}>
        {t('post_for_sale')}
      </CustomText>
      <FlatList
        scrollEnabled={false}
        // horizontal
        numColumns={2}
        columnWrapperStyle={{
          columnGap: scale(10),
        }}
        showsHorizontalScrollIndicator={false}
        data={dataFilter}
        contentContainerStyle={styles.content}
        renderItem={({item}) => (
          <BoxPlaceItem
            isHeart
            isStar
            data={item}
            rental="night"
            seeViewNumber={3.4}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(20),
    paddingHorizontal: scale(10),
  },
  content: {
    marginTop: scale(20),
    // columnGap: scale(20),
    // rowGap: scale(20),
    paddingHorizontal: scale(5),
    paddingBottom: scale(100),
    alignItems: 'center',
  },
});
