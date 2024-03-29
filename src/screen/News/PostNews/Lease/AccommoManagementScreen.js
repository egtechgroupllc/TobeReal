import React, {useLayoutEffect} from 'react';
import {FlatList, ScrollView} from 'react-native';
import {getMyListCreateAccom} from '../../../../Model/api/apiAccom';
import {scale} from '../../../../assets/constants';
import EmptyData from '../../../../components/EmptyData';
import MainWrapper from '../../../../components/MainWrapper';
import Pagination from '../../../../components/Pagination';
import usePagination from '../../../../hooks/usePagination';
import CreateAccomItem from './components/HomeLease/CreateAccomItem';
import ListCreateAccomLoading from './components/HomeLease/ListCreateAccomLoading';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getMyListCreateTour} from '../../../../Model/api/apiTour';
import {getMyListCreateSell} from '../../../../Model/api/apiEstate';

export default function AccommoManagementScreen() {
  const params = useRoute().params;
  const {setOptions} = useNavigation();
  const {data, page, isLoading, setPage} = usePagination(
    params?.isTour
      ? ['accommodation', 'my-list', 1]
      : params?.isSell
      ? ['estate', 'my-list']
      : ['tour', 'my-list', 1],
    params?.isTour
      ? getMyListCreateTour
      : params?.isSell
      ? getMyListCreateSell
      : getMyListCreateAccom,
    {
      keyQuery: params?.isTour
        ? {hasTicket: 1, limit: 12}
        : params?.isSell
        ? {limit: 12}
        : {hasRoom: 1, limit: 12},
    },
  );

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: params?.isTour
        ? 'Danh Sách Tour Đã Tạo'
        : params?.isSell
        ? 'Danh Sách Bất Động Sản Ở Đã Tạo'
        : 'Danh Sách Chỗ Ở Đã Tạo',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const dataNew = data?.data?.rows || (isLoading && [1, 2, 3, 4, 4]);
  const numColumns = Math.ceil(dataNew?.length / 4);

  return (
    <MainWrapper
      scrollEnabled={!isLoading}
      styleContent={{
        marginVertical: scale(20),
      }}>
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
                key={`accommodation/my-list-1-${page}_${data?.data?.count}_${numColumns}`}
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
                      isTour={params?.isTour}
                    />
                  ) : (
                    <ListCreateAccomLoading key={`key_${index}`} />
                  )
                }
              />
            </ScrollView>

            <Pagination
              pageSize={12}
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
    </MainWrapper>
  );
}
