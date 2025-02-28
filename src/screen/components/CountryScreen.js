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
import {CustomInput, MainWrapper} from '../../components';
import CheckBox from '../../components/CheckBox';
import CustomText from '../../components/CustomText';
import EmptyData from '../../components/EmptyData';
import {useCountry} from '../../hooks/useCountry';
import {useLanguage} from '../../hooks/useLanguage';
import Skeleton from '../../components/Skeleton';

// Tách thành component con để tránh re-render không cần thiết
const CountryItem = React.memo(({item, onPress, isChecked, isPhone}) => {
  if (!item?.id) {
    return <Skeleton height={scale(40)} />;
  }

  return (
    <CheckBox
      key={`key_${item?.id}`}
      text={`${item?.flag || ''} ${item?.name}${
        isPhone ? ` (${item?.phone_code})` : ''
      }`}
      textLeft
      isRadio
      onPress={() => onPress(item)}
      isChecked={isChecked}
      style={styles.checkBox}
      fillColor={COLORS.primary}
    />
  );
});

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

  // Tối ưu việc lọc dữ liệu bằng useMemo
  const dataNew = useMemo(() => {
    if (!data?.data || !deferredValue) return data?.data;

    return data.data.filter(item =>
      item?.name?.toLowerCase().includes(deferredValue.toLowerCase()),
    );
  }, [data?.data, deferredValue]);

  // Tối ưu callback để tránh tạo mới function mỗi lần render
  const handleSelectCountry = React.useCallback(item => {
    setCountry(item);
  }, []);

  const renderItem = React.useCallback(
    ({item}) => (
      <CountryItem
        item={item}
        onPress={handleSelectCountry}
        isChecked={country?.id === item?.id}
        isPhone={router?.isPhone}
      />
    ),
    [country?.id, handleSelectCountry, router?.isPhone],
  );

  return (
    <MainWrapper scrollEnabled={false}>
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
            paddingHorizontal: scale(5),
          }}
          keyExtractor={(item, index) =>
            `key_${item?.id}-${item?.name}-${index}`
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={EmptyData}
          renderItem={renderItem}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={10}
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
    backgroundColor: 'transparent',
    width: WIDTH.widthContain,
    alignSelf: 'center',
    marginTop: scale(20),
    borderRadius: scale(6),
    rowGap: scale(16),
    flex: 1,
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
