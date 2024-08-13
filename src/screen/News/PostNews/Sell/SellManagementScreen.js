/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import {getMyListCreateSell} from '../../../../Model/api/apiEstate';
import {scale} from '../../../../assets/constants';
import BottomSheet from '../../../../components/BottomSheet';
import EmptyData from '../../../../components/EmptyData';
import MainWrapper from '../../../../components/MainWrapper';
import Pagination from '../../../../components/Pagination';
import usePagination from '../../../../hooks/usePagination';
import CreateSellItem from './components/CreateSellItem';
import CreateSellItemLoading from './components/CreateSellItemLoading';
import DeleteEstate from './components/PostNewSell/DeleteEstate';
import {useLanguage} from '../../../../hooks/useLanguage';
import {IconHome} from '../../../../assets/icon/Icon';

export default function SellManagementScreen() {
  const params = useRoute().params;
  const {t} = useLanguage();

  const {setOptions, navigate, addListener} = useNavigation();
  const bottomSheetRef = useRef();

  const [dataItemEstate, setDataItemEstate] = useState(null);
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('real_estate_listing'),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigate('POST', {screen: 'PostNewsScreen'})}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
  }, [params]);

  const {data, isLoading, page, setPage, isPending} = usePagination(
    getMyListCreateSell.queyKey,
    getMyListCreateSell,
  );

  const dataNew = data?.data?.rows || (isLoading && [1, 2, 3, 4]);
  useEffect(() => {
    addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }, []);
  return (
    <MainWrapper
      optionsHeader={{
        gestureEnabled: false,
        headerLeft: () => {},
        headerTitle: t('real_estate_listing'),
      }}
      scrollEnabled={false}
      styleContent={{
        marginBottom: scale(20),
      }}>
      {!dataNew?.length > 0 && isPending ? (
        <EmptyData />
      ) : (
        <>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            directionalLockEnabled={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: scale(10),
            }}>
            <FlatList
              data={dataNew}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical={false}
              directionalLockEnabled={true}
              keyExtractor={(item, index) => `$key_${item.id}-${index}`}
              columnWrapperStyle={{
                columnGap: scale(10),
              }}
              contentContainerStyle={styles.content}
              renderItem={({item, index}) =>
                item?.id ? (
                  <CreateSellItem
                    key={`key_${item?.id}-${index}`}
                    data={item}
                    onPressMore={() => {
                      setDataItemEstate(item);
                      bottomSheetRef.current.open();
                    }}
                    onEdit={value => {
                      navigate('PostNewSellScreen', {...item, value});
                    }}
                    onVideoShort={() => {
                      navigate('NoBottomTab', {
                        screen: 'ManageVideoShortScreen',
                        params: {Estate: true, estateId: item?.id},
                      });
                    }}
                  />
                ) : (
                  <CreateSellItemLoading key={`key_${index}`} />
                )
              }
            />
          </ScrollView>

          <Pagination
            pageSize={10}
            currentPage={page}
            totalData={data?.data?.count}
            onChange={num => setPage(num)}
          />

          <BottomSheet
            ref={bottomSheetRef}
            titleIndicator={t('notification')}
            snapPoints={['30%']}
            disableScroll
            styleContent={styles.bottomSheet}>
            <DeleteEstate
              data={dataItemEstate}
              onSuccess={() => {
                bottomSheetRef.current.close();
                setDataItemEstate(null);
              }}
              onCancel={() => {
                bottomSheetRef.current.close();
                setDataItemEstate(null);
              }}
            />
          </BottomSheet>
        </>
      )}
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    rowGap: scale(10),
    padding: scale(20),
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: scale(10),
    rowGap: scale(10),
    paddingVertical: scale(20),
  },
});
