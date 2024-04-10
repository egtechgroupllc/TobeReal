import React from 'react';
import {FlatList, ScrollView, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import CustomText from '../../../../../../components/CustomText';
import Pagination from '../../../../../../components/Pagination';
import usePagination from '../../../../../../hooks/usePagination';
import CreateAccomItem from './CreateAccomItem';
import ListCreateAccomLoading from './ListCreateAccomLoading';

export default function ListCreateAccom({keyArr, callFunc, keyQuery, isTour}) {
  const {navigate} = useNavigation();

  const {data, page, isLoading, setPage} = usePagination(keyArr, callFunc, {
    keyQuery: keyQuery,
  });

  const dataNew = data?.data?.rows || (isLoading && [1, 2, 3]);
  const numColumns = Math.ceil(dataNew?.length / 2);

  if (!numColumns) return null;
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        rowGap: scale(16),
        paddingVertical: scale(16),
      }}>
      <CustomText
        textType="bold"
        style={{
          fontSize: SIZES.medium,
          paddingHorizontal: scale(20),
          color: COLORS.white,
        }}>
        Incomplete Registration Process
      </CustomText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={false}
        directionalLockEnabled={true}
        contentContainerStyle={{
          gap: scale(10),
          alignItems: 'center',
        }}>
        <FlatList
          key={`${keyArr}-${page}_${data?.data?.count}_${numColumns}`}
          data={dataNew}
          numColumns={numColumns}
          alwaysBounceVertical={false}
          directionalLockEnabled={true}
          keyExtractor={(item, index) => `$key_${item.id}-${index}`}
          columnWrapperStyle={
            numColumns >= 2 && {
              columnGap: scale(10),
            }
          }
          contentContainerStyle={{
            paddingHorizontal: scale(20),
            rowGap: scale(10),
          }}
          renderItem={({item, index}) =>
            item?.id ? (
              <CreateAccomItem
                key={`key_${item?.id}-${index}`}
                data={item}
                isTour={isTour}
              />
            ) : (
              <ListCreateAccomLoading />
            )
          }
        />
      </ScrollView>
      <Pagination
        currentPage={page}
        totalPages={data?.data?.count}
        onChange={num => setPage(num)}
        styleWrapper={{
          marginVertical: 0,
        }}
      />
    </View>
  );
}
