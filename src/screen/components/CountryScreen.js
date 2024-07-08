import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {
  useDeferredValue,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import RNRestart from 'react-native-restart';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getListCountry} from '../../Model/api/common';
import {COLORS, SHADOW, SIZES, WIDTH, scale} from '../../assets/constants';
import {IconSearch} from '../../assets/icon/Icon';
import {CustomInput} from '../../components';
import CheckBox from '../../components/CheckBox';
import CustomText from '../../components/CustomText';
import EmptyData from '../../components/EmptyData';
import {useCountry} from '../../hooks/useCountry';
import {useLanguage} from '../../hooks/useLanguage';
import Skeleton from '../../components/Skeleton';

export default function CountryScreen() {
  const {t} = useLanguage();
  const {setOptions, goBack} = useNavigation();
  const router = useRoute().params;
  const [country, setCountry] = useState(
    router?.province || router?.country || '',
  );
  const [search, setSearch] = useState('');

  const deferredValue = useDeferredValue(search);
  const insets = useSafeAreaInsets();

  const {data, isLoading, isError} = useQuery({
    queryKey: ['common', 'list-country', router?.isProvince],
    queryFn: () =>
      getListCountry(router?.isProvince ? router?.country?.geoname_id : ''),
  });
  const {onSaveCountry, country: countryStore} = useCountry();

  const handleDone = () => {
    if (!router) {
      onSaveCountry(country);

      setTimeout(() => {
        RNRestart.restart();
      }, 1000);
    } else {
      router?.onGoBack(country);
      goBack();
    }
  };

  useEffect(() => {
    !router?.isProvince && countryStore?.id && setCountry(countryStore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryStore?.id, router?.isProvince]);

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: router?.isProvince
        ? t('province_city')
        : router?.isPhone
        ? t('phone_area_code')
        : t('country'),

      headerRight: () =>
        country?.name && (
          <CustomText
            onPress={handleDone}
            textType="semiBold"
            style={{
              color: '#fff',
              fontSize: SIZES.xMedium,
            }}>
            {t('done')}
          </CustomText>
        ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country?.name]);

  const dataNew = useMemo(() => {
    const dataFilter = data?.data?.filter((item, index) => {
      return item?.name?.toLowerCase().includes(deferredValue?.toLowerCase());
    });

    return dataFilter;
  }, [data?.data, deferredValue]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.content}>
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
          data={dataNew || [1, 2, 3, 4, 5]}
          contentContainerStyle={{
            paddingBottom: insets.bottom + scale(20),
            rowGap: scale(6),
          }}
          keyExtractor={(item, index) =>
            `key_${item?.id}-${item?.name}-${index}`
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <EmptyData />}
          renderItem={({item}) =>
            item?.id ? (
              <CheckBox
                key={`key_${item?.id}`}
                text={`${item?.flag ? item?.flag : ''} ${item?.name}${
                  router?.isPhone ? ` (${item?.phone_code})` : ''
                }`}
                textLeft
                isRadio
                onPress={() => setCountry(item)}
                isChecked={country?.id === item?.id}
                style={styles.checkBox}
              />
            ) : (
              <Skeleton height={scale(40)} />
            )
          }
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
  content: {
    backgroundColor: '#fff',
    width: WIDTH.widthContain,
    alignSelf: 'center',
    marginTop: scale(20),
    borderRadius: scale(6),
    rowGap: scale(16),
    padding: scale(14),
    flex: 1,
    ...SHADOW,
  },
  indexLetterStyle: {
    fontSize: SIZES.small,
    color: COLORS.black,
    fontWeight: '500',
  },
  indexContainerStyle: {
    position: 'absolute',
    right: scale(-25),
    top: scale(-90),
  },
});
