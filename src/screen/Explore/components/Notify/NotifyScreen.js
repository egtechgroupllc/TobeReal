import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useMemo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {COLORS, SHADOW, WIDTH, scale} from '../../../../assets/constants';
import MainWrapper from '../../../../components/MainWrapper';
import {useLanguage} from '../../../../hooks/useLanguage';
import EmptyData from '../../../../components/EmptyData';
import NotifyItems from './components/NotifyItems';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {getHistoryDeposit} from '../../../../Model/api/auth';

const dataWaiting = [
  {
    id: 1,
    desc: ' Congratulations on your successful booking at Marine Hotel.',
    type: 'Booking',
  },
  {
    id: 2,
    desc: 'Congratulations, you have successfully deposited $100 into your Tobe House wallet.',
    type: 'Deposit',
  },
  {
    id: 3,
    desc: ' Congratulations on your successful booking at Marine Hotel.',
    type: 'Booking',
  },
  {
    id: 4,
    desc: 'Congratulations, you have successfully deposited $100 into your Tobe House wallet.',
    type: 'Deposit',
  },
  {
    id: 5,
    desc: ' Congratulations on your successful booking at Marine Hotel.',
    type: 'Booking',
  },
];

export default function NotifyScreen() {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  // const queryClient = useQueryClient();
  // const {isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage} =
  //   useInfiniteQuery({
  //     queryKey: ['deposit', 'my-order'],
  //     queryFn: getHistoryDeposit,
  //     getNextPageParam: (lastPage, allPages) => {
  //       if (!(lastPage?.data?.rows?.length <= 0)) return allPages?.length + 1;

  //       return undefined;
  //     },
  //   });
  // const dataArr = useMemo(
  //   () =>
  //     data?.pages
  //       .map(page => {
  //         if (!page) return undefined;
  //         return page?.data?.rows;
  //       })
  //       .flat(),
  //   [data?.pages],
  // );

  const {setOptions} = useNavigation();
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('notification'),
      headerTitleStyle: {
        textAlign: 'center',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MainWrapper scrollEnabled={false}>
      <FlatList
        data={dataWaiting}
        style={{
          height: '100%',
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          rowGap: scale(10),
          padding: scale(20),
        }}
        renderItem={({item, index}) => <NotifyItems data={item} />}
        ListEmptyComponent={() => (
          <EmptyData styleWrapper={{marginTop: '40%'}} />
        )}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    width: WIDTH.widthContain,
    // marginVertical: scale(20),
    marginTop: scale(10),
    alignItems: 'center',
  },
  containTab: {
    height: scale(56),
    alignItems: 'center',
    borderRadius: scale(12),
    backgroundColor: '#e6e7e8',
    padding: scale(4),
  },
  tabActive: {
    color: COLORS.primary,
    borderRadius: scale(12),
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
  },
  img: {
    width: scale(240),
    height: scale(240),
  },
  btnAdd: {
    position: 'absolute',
    bottom: scale(-70),
    right: 0,
    zIndex: 999,
    width: scale(150),
  },
  box: {
    backgroundColor: '#FDFDFD',
    minHeight: scale(100),
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: '#DADADA4D',
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    rowGap: scale(5),
    ...SHADOW,
  },
  code: {
    borderWidth: scale(1),
    height: scale(30),
    borderRadius: scale(6),
    borderColor: '#0000001A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    alignItems: 'center',
    marginTop: scale(5),
  },
  line: {
    backgroundColor: COLORS.grey,
    height: scale(1),
    width: '100%',
  },
});
