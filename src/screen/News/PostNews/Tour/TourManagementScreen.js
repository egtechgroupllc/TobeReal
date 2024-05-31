import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {getMyListCreateTour} from '../../../../Model/api/apiTour';
import {scale} from '../../../../assets/constants';
import {IconHome} from '../../../../assets/icon/Icon';
import EmptyData from '../../../../components/EmptyData';
import MainWrapper from '../../../../components/MainWrapper';
import Pagination from '../../../../components/Pagination';
import usePagination from '../../../../hooks/usePagination';
import ListCreateAccomLoading from '../Lease/components/HomeLease/ListCreateAccomLoading';
import CreateTourItem from './components/CreateTourItem';

export default function TourManagementScreen() {
  const params = useRoute().params;
  const {setOptions, navigate, goBack} = useNavigation();
  const {data, page, isLoading, isError, setPage} = usePagination(
    ['tour', 'my-list', 1],
    getMyListCreateTour,
    {
      hasTicket: 1,
      limit: 12,
    },
  );

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: 'Tour List Created',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('POST')}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
      headerLeftNavigate: 'TourScreen',
      // headerLeft: () => (
      //   <TouchableOpacity onPress={() => navigate('PostNewLeaseScreen')}>
      //     <IconGoBack style={{width: scale(20)}} />
      //   </TouchableOpacity>
      // ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const dataNew = data?.data?.rows || (isLoading && [1, 2, 3, 4, 4]);
  const numColumns = Math.ceil(dataNew?.length / 4);
  return (
    <MainWrapper
      scrollEnabled={!isLoading}
      refreshControl
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
              }}>
              <FlatList
                key={`tour/my-list-1-${page}_${data?.data?.count}_${numColumns}`}
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
                    <CreateTourItem
                      key={`key_${item?.id}-${index}`}
                      data={item}
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
