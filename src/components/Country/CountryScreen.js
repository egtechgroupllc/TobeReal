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
import {useLanguage} from '~/hooks/useLanguage';
import {COLORS, SHADOW, SIZES, WIDTH} from '~/assets/constants';
import {scale} from '~/utils/scale';
import Input from '../Input';
import {IconSearch} from '~/assets/icon/Icon';
import EmptyData from '../EmptyData';
import CheckBox from '../CheckBox';
import CText from '../CText';
import Skeleton from '../Skeleton';
import {useCountry} from '~/hooks/useCountry';
import MainWrapper from '../MainWrapper';
import {getListCountry} from '~/api/user';

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
    queryKey: [
      ...getListCountry.queryKey,
      {
        level: !router?.isProvince ? 'country' : 'province',
        parent: router?.isProvince ? router?.country?.geonameId : '',
      },
    ],
    queryFn: () =>
      getListCountry({
        level: !router?.isProvince ? 'country' : 'province',
        parent: router?.isProvince ? router?.country?.geonameId : '',
      }),
  });

  const {onSaveCountry, country: countryStore} = useCountry();
  useEffect(() => {
    !router?.isProvince && countryStore?.country_id && setCountry(countryStore);
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
        (country?.name || country?.province_name) && (
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);
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

  const dataNew = useMemo(() => {
    const dataFilter = data?.data?.addressOptions?.filter((item, index) => {
      return !router?.isProvince
        ? item?.name?.toLowerCase().includes(deferredValue?.toLowerCase())
        : item?.province_name
            ?.toLowerCase()
            .includes(deferredValue?.toLowerCase());
    });

    return dataFilter;
  }, [data?.data, deferredValue]);

  return (
    <MainWrapper backgroundColor={COLORS.input} scrollEnabled={false}>
      <View style={styles.content}>
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
          renderItem={({item}) => {
            return item?.id || item?.province_id ? (
              <CheckBox
                key={`key_${item?.id}`}
                text={`${item?.flag ? item?.flag : ''} ${
                  item?.name || item?.province_name
                }${router?.isPhone ? ` (${item?.phone_code})` : ''}`}
                textStyle={{color: COLORS.White}}
                textLeft
                isRadio
                onPress={() => setCountry(item)}
                isChecked={
                  router?.isProvince
                    ? country?.province_id === item?.province_id
                    : country?.id === item?.id
                }
                style={styles.checkBox}
              />
            ) : (
              <Skeleton height={scale(40)} />
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
  content: {
    // backgroundColor: COLORS.input,
    width: WIDTH.widthContain,
    alignSelf: 'center',
    rowGap: scale(16),
    padding: scale(14),
    paddingTop: scale(20),
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
