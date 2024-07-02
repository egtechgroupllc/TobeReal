import {useNavigation, useRoute} from '@react-navigation/native';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import LottieView from 'lottie-react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Alert, FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {
  getHistoryDeposit,
  getHistoryWithdraw,
  postCancelWithdraw,
} from '../../../Model/api/auth';
import {COLORS, animations, scale} from '../../../assets/constants';
import {showMess} from '../../../assets/constants/Helper';
import {CustomButton} from '../../../components';
import EmptyData from '../../../components/EmptyData';
import MainWrapper from '../../../components/MainWrapper';
import {useLanguage} from '../../../hooks/useLanguage';
import OptionAccommodation from '../../Explore/components/FindAccommodation/OptionAccommodation';
import ItemHistoryTrans from './components/HistoryTransaction/ItemHistoryTrans';
import ItemHistoryTransLoading from './components/HistoryTransaction/ItemHistoryTransLoading';
const listInfo = [
  {
    text: 'All',
  },
  {
    text: 'Bank',
  },
  {
    text: 'MoMo',
  },
];
export default function HistoryTransactionScreen() {
  const {t} = useLanguage();

  const {setOptions} = useNavigation();
  const [tab, setTab] = useState(t('deposit'));
  const params = useRoute().params;
  useEffect(() => {
    params?.withdraw && setTab(t('withdraw'));
  }, [params?.withdraw]);
  const transferType = [{name: t('deposit')}, {name: t('withdraw')}];

  useEffect(() => {
    return setOptions({
      headerTitleComponent: () => (
        <>
          {transferType.map((item, index) => {
            return (
              <View key={index}>
                <CustomButton
                  buttonType="normal"
                  style={{
                    backgroundColor:
                      item?.name === tab ? COLORS.white : COLORS.grey,
                  }}
                  styleWrapper={{
                    width: scale(100),
                    paddingBottom: scale(2),
                  }}
                  text={item?.name}
                  styleText={{
                    color: item?.name === tab ? COLORS.primary : COLORS.white,
                  }}
                  onPress={() => setTab(item?.name)}
                />
              </View>
            );
          })}
        </>
      ),
    });
  }, [tab]);

  const {navigate} = useNavigation();
  const {isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage} =
    useInfiniteQuery({
      queryKey:
        tab === t('deposit')
          ? ['deposit', 'my-order']
          : ['withdraw', 'my-order'],
      queryFn: tab === t('deposit') ? getHistoryDeposit : getHistoryWithdraw,
      getNextPageParam: (lastPage, allPages) => {
        if (!(lastPage?.data?.rows?.length <= 0)) return allPages?.length + 1;

        return undefined;
      },
    });
  const dataArr = useMemo(
    () =>
      data?.pages
        .map(page => {
          if (!page) return undefined;
          return page?.data?.rows;
        })
        .flat(),
    [data?.pages],
  );
  const queryClient = useQueryClient();

  const refresh = useRef(false);
  function pullToRefresh(value) {
    refresh.current = true;
    queryClient.invalidateQueries();
    refresh.current = false;
  }
  const withdrawMutation = useMutation({
    mutationFn: postCancelWithdraw,
  });
  const CancelWithdraw = value => {
    withdrawMutation.mutate(
      {id: value},
      {
        onSuccess: dataInside => {
          showMess(
            dataInside?.message,
            dataInside?.status ? 'success' : 'error',
          );
          if (dataInside?.status) {
            queryClient.invalidateQueries(['withdraw', 'my-order']);
            // navigate('FinancialScreen', {screen: 'HistoryTransaction'});
          }
        },
      },
    );
  };
  const handleCancel = value => {
    Alert.alert('Are you sure to cancel this transaction?', '', [
      {
        text: 'Cancel',
        // onPress: () => Alert.alert('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => CancelWithdraw(value)},
    ]);
  };
  return (
    <MainWrapper
      noImgColor
      scrollEnabled={false}
      backgroundColor={'#fff'}
      refreshControl>
      <>
        <OptionAccommodation
          isShaDow
          data={listInfo}
          styleWrapper={{
            flex: 0,
          }}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataArr || (isLoading && [1, 2, 3, 5])}
          refreshControl={
            <RefreshControl
              refreshing={refresh.current}
              onRefresh={pullToRefresh}
              tintColor={COLORS.primary}
            />
          }
          ListEmptyComponent={() => (
            <EmptyData
              styleWrapper={{
                marginTop: '40%',
              }}
            />
          )}
          ListFooterComponent={() =>
            isFetchingNextPage && (
              <View
                style={{
                  height: scale(30),
                }}>
                <LottieView
                  autoPlay={true}
                  source={animations.loading}
                  style={{
                    height: '100%',
                  }}
                />
              </View>
            )
          }
          onEndReached={hasNextPage && fetchNextPage}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{
            paddingTop: scale(10),
          }}
          renderItem={({item, index}) =>
            item?.id ? (
              <ItemHistoryTrans
                tab={tab}
                onPress={value =>
                  navigate('NoBottomTab', {
                    screen: 'DetailHistoryDeposit',
                    params: value,
                  })
                }
                key={item?.id}
                data={item}
                isBackground={index % 2 === 0}
                onPressCancel={() => handleCancel(item?.id)}
              />
            ) : (
              <ItemHistoryTransLoading
                isBackground={index % 2 === 0}
                key={index}
              />
            )
          }
        />
      </>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
