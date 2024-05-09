/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
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

import {getListCurrency} from '../../Model/api/common';
import {SHADOW, SIZES, WIDTH, scale} from '../../assets/constants';
import {IconSearch} from '../../assets/icon/Icon';
import {CustomInput} from '../../components';
import CheckBox from '../../components/CheckBox';
import CustomText from '../../components/CustomText';
import EmptyData from '../../components/EmptyData';
import {useLanguage} from '../../hooks/useLanguage';
import {useCountry} from '../../hooks/useCountry';

export default function CurrencyScreen() {
  const {t} = useLanguage();
  const {setOptions, goBack} = useNavigation();
  const router = useRoute().params;

  const [currency, setCurrency] = useState(router?.currency || '');
  const [search, setSearch] = useState('');

  const deferredValue = useDeferredValue(search);
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData(['common', 'list-currency']);

  const handleDone = () => {
    router && router.onGoBack(currency);
    goBack();
  };

  const {country, onSaveCurrency} = useCountry();
  const dataNew = useMemo(() => {
    const dataFilter = data?.data?.filter((item, index) => {
      if (country?.currency_code === item?.currency_code) {
        setCurrency(item);
        onSaveCurrency(item);
      }

      return item?.currency_code
        ?.toLowerCase()
        .includes(
          country?.currency_code?.toLowerCase() || deferredValue?.toLowerCase(),
        );
    });

    return dataFilter;
  }, [data?.data, deferredValue, country]);

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('main_currency'),

      headerRight: () =>
        currency && (
          <CustomText
            onPress={handleDone}
            textType="semiBold"
            style={{
              color: '#fff',
              fontSize: SIZES.xMedium,
            }}>
            Done
          </CustomText>
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
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#fff',
          width: WIDTH.widthContain,
          alignSelf: 'center',
          marginTop: scale(20),
          borderRadius: scale(6),
          rowGap: scale(16),
          padding: scale(14),
          flex: 1,
          ...SHADOW,
        }}>
        <CustomInput
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
          renderItem={({item}) => {
            return (
              <CheckBox
                key={`key_${item?.id}`}
                text={item?.currency_code}
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
    </View>
  );
}

const styles = StyleSheet.create({
  checkBox: {
    justifyContent: 'space-between',
    paddingVertical: scale(10),
    width: '100%',
  },
});
