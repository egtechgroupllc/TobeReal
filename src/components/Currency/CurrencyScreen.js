/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useCountry} from '~/hooks/useCountry';
import {useLanguage} from '~/hooks/useLanguage';

import CText from '../CText';
import {
  animations,
  COLORS,
  images,
  SHADOW,
  SIZES,
  WIDTH,
} from '~/assets/constants';
import {scale} from '~/utils/scale';
import Input from '../Input';
import {IconSearch} from '~/assets/icon/Icon';
import EmptyData from '../EmptyData';
import CheckBox from '../CheckBox';
import MainWrapper from '../MainWrapper';
import {getListCurrency} from '~/api/deposit';
import {useAuthentication} from '~/hooks/useAuthentication';
import LottieView from 'lottie-react-native';

export default function CurrencyScreen() {
  const {t} = useLanguage();
  const {setOptions, goBack} = useNavigation();
  const router = useRoute().params;

  const [currency, setCurrency] = useState(router?.currency || '');
  const [search, setSearch] = useState('');

  const deferredValue = useDeferredValue(search);
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const {token} = useAuthentication();
  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    isError,
  } = useInfiniteQuery({
    queryKey: [...getListCurrency.queryKey, {keyword: search, limit: 999}],
    queryFn: ({pageParam}) =>
      getListCurrency({
        pageParam,
        limit: 999,
        keyword: search,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!(lastPage?.data?.length <= 0)) return allPages?.length + 1;

      return undefined;
    },
    enabled: !!token,
  });
  const dataArr = useMemo(
    () =>
      data?.pages
        .map(page => {
          if (!page) return undefined;
          return page?.data;
        })
        .flat(),
    [data?.pages],
  );
  const handleDone = () => {
    router && router.onGoBack(currency);
    goBack();
  };
  const {country, onSaveCurrency} = useCountry();
  const dataNew = useMemo(() => {
    const dataFilter = dataArr?.filter((item, index) => {
      if (country?.currencyCode === item?.currency_code) {
        setCurrency(item);
        onSaveCurrency(item);
      }

      return item?.currency_code
        ?.toLowerCase()
        .includes(
          country?.currencyCode?.toLowerCase() || deferredValue?.toLowerCase(),
        );
    });

    return dataFilter;
  }, [dataArr, deferredValue, country?.currencyCode]);
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('main_currency'),

      headerRight: () =>
        currency && (
          <CText
            onPress={handleDone}
            textType="semiBold"
            style={{
              color: '#fff',
              fontSize: SIZES.xMedium,
            }}>
            {t('done')}
          </CText>
        ),
    });
  }, [currency]);

  const flatListRef = useRef();

  // const indexData = useMemo(() => {
  //   const dataFilter = data?.data?.findIndex(item => {
  //     return item?.id === currency?.id;
  //   });

  //   return dataFilter;
  // }, [router]);

  // const scrollToIndex = useCallback((index = 0) => {
  //   flatListRef.current.scrollToIndex({
  //     animated: true,
  //     index: index,
  //     viewPosition: 0.1,
  //   });
  // }, []);

  // useEffect(() => {
  //   indexData && scrollToIndex(indexData);
  // }, [indexData]);

  return (
    <MainWrapper
      backgroundColor={COLORS.input}
      scrollEnabled={false}
      styleContent={{paddingTop: scale(20)}}>
      <View
        style={{
          width: WIDTH.widthContain,
          alignSelf: 'center',
          borderRadius: scale(6),
          rowGap: scale(16),
          paddingHorizontal: scale(16),
          flex: 1,
          ...SHADOW,
        }}>
        <Input
          placeholder={t('search')}
          iconLeft={IconSearch}
          styleIcon={{
            width: scale(16),
            height: scale(16),
          }}
          onChangeText={setSearch}
        />

        <FlatList
          ref={flatListRef}
          data={dataNew}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom + scale(20),
          }}
          keyExtractor={(item, index) =>
            `key_${item?.id}-${item?.currency_code}-${index}`
          }
          onScrollToIndexFailed={({index}) => {
            const wait = new Promise(resolve => setTimeout(resolve, 100));
            wait.then(() => {
              // scrollToIndex(indexData);
            });
          }}
          ListEmptyComponent={() => <EmptyData />}
          ListFooterComponent={() =>
            isFetchingNextPage && (
              <View
                style={{
                  height: scale(40),
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
          onEndReachedThreshold={0.1}
          renderItem={({item}) => {
            return (
              <CheckBox
                key={`key_${item?.id}`}
                text={item?.currency_code}
                textStyle={{color: COLORS.White}}
                textLeft
                isRadio
                onPress={() => setCurrency(item)}
                isChecked={currency?.currency_code === item?.currency_code}
                style={styles.checkBox}
              />
            );
          }}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  checkBox: {
    justifyContent: 'space-between',
    paddingVertical: scale(10),
    width: '100%',
  },
});
