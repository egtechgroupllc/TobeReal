import {useNavigation, useRoute} from '@react-navigation/native';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import LottieView from 'lottie-react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Alert, FlatList, RefreshControl, StyleSheet, View} from 'react-native';
// import {
//   getHistoryDeposit,
//   getHistoryWithdraw,
//   postCancelWithdraw,
// } from '../../../Model/api/auth';
import ItemHistoryTrans from './components/HistoryTransaction/ItemHistoryTrans';
import ItemHistoryTransLoading from './components/HistoryTransaction/ItemHistoryTransLoading';
import {useLanguage} from '~/hooks/useLanguage';
import {Button, MainWrapper} from '~/components';
import {scale} from '~/utils/scale';
import {animations, COLORS, images} from '~/assets/constants';
import EmptyData from '~/components/EmptyData';
import Option from '~/components/Option';
import {getDepositHistory} from '~/api/deposit';
import {getWithdrawHistory, postCancelWithdraw} from '~/api/withdraw';
import {showMess} from '~/assets/constants/Helper';

export default function HistoryTransactionScreen() {
  const {t} = useLanguage();
  const listInfo = [
    {
      text: t('all'),
    },
    {
      text: 'Bank',
    },
    {
      text: 'MoMo',
    },
  ];
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
                <Button
                  sizeButton="small"
                  backgroundColor={
                    item?.name === tab ? COLORS.primary : COLORS.grey
                  }
                  styleContent={{
                    width: scale(150),
                    paddingBottom: scale(2),
                  }}
                  title={item?.name}
                  styleText={{
                    color: COLORS.White,
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
          ? [...getDepositHistory.queryKey]
          : [...getWithdrawHistory.queryKey],
      queryFn: tab === t('deposit') ? getDepositHistory : getWithdrawHistory,
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
            t(dataInside?.message),
            !dataInside?.error ? 'success' : 'error',
          );
          if (!dataInside?.error) {
            queryClient.invalidateQueries([...getWithdrawHistory.queryKey]);
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
      sourceImage={images.backgroundHome}
      noImgColor
      scrollEnabled={false}
      backgroundColor={COLORS.primary}
      refreshControl>
      <>
        <Option
          isShaDow
          data={listInfo}
          styleWrapper={{
            flex: 0,
            backgroundColor: COLORS.primary,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.White,
          }}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataArr || (isLoading && [1, 2, 3, 5])}
          refreshControl={
            <RefreshControl
              refreshing={refresh.current}
              onRefresh={pullToRefresh}
              tintColor={COLORS.White}
            />
          }
          ListEmptyComponent={() => (
            <EmptyData
              styleWrapper={{
                marginTop: '40%',
              }}
            />
          )}
          // ListFooterComponent={() =>
          //   isFetchingNextPage && (
          //     <View
          //       style={{
          //         height: scale(30),
          //       }}>
          //       <LottieView
          //         autoPlay={true}
          //         source={animations.loading}
          //         style={{
          //           height: '100%',
          //         }}
          //       />
          //     </View>
          //   )
          // }
          // onEndReached={hasNextPage && fetchNextPage}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{
            paddingTop: scale(10),
          }}
          renderItem={({item, index}) => {
            return item?.id ? (
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
            );
          }}
        />
      </>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
