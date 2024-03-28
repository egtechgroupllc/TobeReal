import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import MainWrapper from '../../../../components/MainWrapper';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getMyListCreateAccom} from '../../../../Model/api/apiAccom';
import {scale} from '../../../../assets/constants';
import CreateAccomItem from './components/HomeLease/CreateAccomItem';
import Pagination from '../../../../components/Pagination';
import EmptyData from '../../../../components/EmptyData';
import ListCreateAccomLoading from './components/HomeLease/ListCreateAccomLoading';
import {useLanguage} from '../../../../hooks/useLanguage';
import usePagination from '../../../../hooks/usePagination';

export default function AccommoManagementScreen() {
  const {data, page, isLoading, setPage} = usePagination(
    ['accommodation', 'my-list', 1],
    getMyListCreateAccom,
    {
      keyQuery: {hasRoom: 1, limit: 12},
    },
  );

  const numColumns = Math.ceil(data?.data?.rows?.length / 4);

  return (
    <MainWrapper
      scrollEnabled={!isLoading}
      styleContent={{
        marginVertical: scale(20),
      }}>
      {!isLoading ? (
        <>
          {numColumns ? (
            <>
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
                  key={`accommodation/my-list-1-${page}`}
                  data={data?.data?.rows}
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
                  renderItem={({item, index}) => (
                    <CreateAccomItem
                      key={`key_${item?.id}-${index}`}
                      data={item}
                    />
                  )}
                />
              </ScrollView>

              <Pagination
                currentPage={page}
                totalPages={data?.data?.count}
                onChange={num => setPage(num)}
              />
            </>
          ) : (
            <EmptyData
              styleWrapper={{
                marginTop: '40%',
                justifyContent: 'center',
              }}
            />
          )}
        </>
      ) : (
        <View
          style={{
            paddingHorizontal: scale(20),
            rowGap: scale(10),
          }}>
          <ListCreateAccomLoading />
          <ListCreateAccomLoading />
        </View>
      )}
    </MainWrapper>
  );
}
