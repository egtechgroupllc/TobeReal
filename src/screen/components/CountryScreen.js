import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {
  useDeferredValue,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AlphabetList} from 'react-native-section-alphabet-list';
import {getListCountry} from '../../api/common';
import {COLORS, SHADOW, SIZES, WIDTH, scale} from '../../assets/constants';
import {IconSearch} from '../../assets/icon/Icon';
import {CustomInput} from '../../components';
import CheckBox from '../../components/CheckBox';
import CustomText from '../../components/CustomText';
import EmptyData from '../../components/EmptyData';
import {useLanguage} from '../../hooks/useLanguage';

export default function CountryScreen() {
  const {t} = useLanguage();
  const {setOptions, goBack} = useNavigation();
  const router = useRoute().params;

  const [country, setCountry] = useState(router?.country || '');
  const [search, setSearch] = useState('');

  const deferredValue = useDeferredValue(search);
  const insets = useSafeAreaInsets();

  const {data, isLoading, isError} = useQuery({
    queryKey: ['common', 'list-country', router?.isProvince],
    queryFn: () =>
      getListCountry(router?.isProvince ? router?.country?.geoname_id : ''),
  });

  const handleDone = () => {
    router.onGoBack(country);
    goBack();
  };

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: router?.isProvince ? t('province_city') : t('country'),

      headerRight: () =>
        country?.name && (
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
  }, [country?.name]);

  const dataNew = useMemo(() => {
    // const countryGroups = data?.data
    //   ?.sort((a, b) => a?.name - b?.name)
    //   ?.reduce((acc, item) => {
    //     const initial = item?.name.charAt(0).toUpperCase();
    //     acc[initial] = [...(acc[initial] || []), item];
    //     return acc;
    //   }, {});

    const dataFilter = data?.data?.filter((item, index) => {
      return item?.name?.toLowerCase().includes(deferredValue?.toLowerCase());
    });

    const countryGroups = dataFilter?.map((item, index) => {
      return {
        ...item,
        value: item?.name,
        key: `key_${item?.id}`,
      };
    });

    return countryGroups;
  }, [data?.data, deferredValue]);

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
        <AlphabetList
          data={dataNew || []}
          indexLetterStyle={{
            fontSize: SIZES.small,
            color: COLORS.black,
            fontWeight: '500',
          }}
          listHeaderHeight={-80 + insets.top}
          indexContainerStyle={{
            position: 'absolute',
            right: scale(-25),
            top: scale(-90),
          }}
          contentContainerStyle={{
            paddingBottom: insets.bottom + scale(100),
          }}
          keyExtractor={(item, index) =>
            `key_${item?.id}-${item?.name}-${index}`
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <EmptyData />}
          renderCustomItem={item => (
            <CheckBox
              key={`key_${item?.id}`}
              text={`${item?.flag ? item?.flag : ''} ${item?.name}`}
              textLeft
              isRadio
              onPress={() => setCountry(item)}
              isChecked={country?.id === item?.id}
              style={styles.checkBox}
            />
          )}
          renderCustomSectionHeader={section => (
            <View
              style={{
                backgroundColor: COLORS.white,
                paddingVertical: scale(4),
              }}>
              <CustomText style={{fontSize: SIZES.medium}} textType="semiBold">
                {section?.title}
              </CustomText>
            </View>
          )}
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