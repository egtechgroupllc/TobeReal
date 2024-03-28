import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {
  useDeferredValue,
  useLayoutEffect,
  useMemo,
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

export default function CurrencyScreen() {
  const {t} = useLanguage();
  const {setOptions, goBack} = useNavigation();
  const router = useRoute().params;

  const [currency, setCurrency] = useState(router?.currency || '');
  const [search, setSearch] = useState('');

  const deferredValue = useDeferredValue(search);
  const insets = useSafeAreaInsets();

  const {data, isLoading, isError} = useQuery({
    queryKey: ['common', 'list-currency'],
    queryFn: getListCurrency,
  });

  const handleDone = () => {
    router.onGoBack(currency);
    goBack();
  };

  const dataNew = useMemo(() => {
    const dataFilter = data?.data?.filter((item, index) => {
      return item?.currency_code
        ?.toLowerCase()
        .includes(deferredValue?.toLowerCase());
    });

    return dataFilter;
  }, [data?.data, deferredValue]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

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
          data={dataNew}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom + scale(20),
          }}
          keyExtractor={(item, index) =>
            `key_${item?.id}-${item?.currency_code}-${index}`
          }
          ListEmptyComponent={() => <EmptyData />}
          renderItem={({item}) => {
            return (
              <CheckBox
                key={`key_${item?.id}`}
                text={item?.currency_code}
                textLeft
                isRadio
                onPress={() => setCurrency(item)}
                isChecked={currency?.id === item?.id}
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
