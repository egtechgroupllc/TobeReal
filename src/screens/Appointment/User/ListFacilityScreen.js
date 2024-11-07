import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {scale} from '~/utils/scale';
import EmptyData from '~/components/EmptyData';
import CText from '~/components/CText';
import {animations, COLORS, images, SIZES} from '~/assets/constants';
import CheckBox from '~/components/CheckBox';
import MainWrapper from '~/components/MainWrapper';
import CImage from '~/components/CImage';
import AppointmentHeader from '~/components/AppointmentHeader/AppointmentHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button} from '~/components';
import {getListFacility} from '~/api/common';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useAuthentication} from '~/hooks/useAuthentication';
import {debounce} from 'lodash';
import LottieView from 'lottie-react-native';
import FacilityItem from './Schedule/components/FacilityItem';
import {useLanguage} from '~/hooks/useLanguage';
import Input from '~/components/Input';
import {IconSearch} from '~/assets/icon/Icon';
import AnimatedLottieView from 'lottie-react-native';
export default function ListFacilityScreen() {
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState(params?.dataFacility || '');
  const {t} = useLanguage();
  const params = useRoute().params;
  const {token} = useAuthentication();
  const {goBack, navigate} = useNavigation();

  // const handlePress = (item, index) => {
  //   setSelect(prev =>
  //     prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item],
  //   );
  // };
  const handlePress = item => {
    setSelect(prev => (prev === item ? '' : item));
  };
  const onChangeText = useCallback(
    debounce(text => {
      setSearch(text);
    }, 500),
    [],
  );

  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    isError,
  } = useInfiniteQuery({
    queryKey: [...getListFacility.queryKey, {keyword: search, limit: 10}],
    queryFn: ({pageParam}) =>
      getListFacility({
        pageParam,
        limit: 10,
        keyword: search,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!(lastPage?.data?.rows?.length <= 0)) return allPages?.length + 1;

      return undefined;
    },
  });
  const dataArr = useMemo(() => {
    const facilities = data?.pages
      .map(page => {
        if (!page) return undefined;
        return page?.data?.rows;
      })
      .flat();

    if (facilities && !params?.isDetail) {
      facilities.unshift({
        id: 'other',
        name: t('other_facility'),
        files: null,
      });
    }

    return facilities;
  }, [data?.pages]);

  const handleConfirm = useCallback(() => {
    if (params?.onGoBack) {
      params.onGoBack([select]);
    }
    if (params?.openBottomSheet) {
      params.openBottomSheet();
    }
    goBack();
  }, [select]);
  return (
    <MainWrapper
      scrollEnabled={false}
      sourceImage={images.backgroundHome}
      headerTitle={t('list_facilities')}
      styleContent={{
        paddingTop: scale(20),
        paddingHorizontal: scale(15),
        rowGap: scale(15),
      }}
      optionsHeader={{
        headerTitleStyle: {
          textAlign: 'left',
        },
        headerStyle: {
          paddingBottom: 0,
        },
        headerRight: () => {
          if (!params?.isDetail) {
            return (
              <Button.Text
                title={t('confirm')}
                padding={scale(0)}
                onPress={handleConfirm}
                styleText={{
                  color: COLORS.cyan,
                  fontSize: SIZES.xMedium,
                  paddingHorizontal: 0,
                }}
              />
            );
          }
          return null;
        },
      }}>
      <Input
        styleContent={{
          ...styles.input,
          alignSelf: 'center',
          backgroundColor: COLORS.input,
          borderWidth: 0,
        }}
        sizeInput={'small'}
        placeholder={t('search')}
        placeholderTextColor={COLORS.grey}
        onChangeText={onChangeText}
        icon={IconSearch}
        propsIcon={{fill: COLORS.White}}
      />

      <FlatList
        data={dataArr || (isLoading && [1, 2, 3, 5])}
        numColumns={2}
        columnWrapperStyle={{
          columnGap: scale(15),
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          rowGap: scale(10),
          paddingBottom: scale(100),
        }}
        ListEmptyComponent={<EmptyData />}
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
        renderItem={({item, index}) => (
          <FacilityItem
            data={item}
            params={params}
            onPress={handlePress}
            select={select}
            isLoading={isLoading}
          />
        )}
      />
      {isLoading && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            paddingTop: scale(200),
            alignSelf: 'center',
          }}>
          <AnimatedLottieView
            source={animations.medicalLoading}
            autoPlay
            loop
            style={{
              width: scale(250),
              height: scale(250),
            }}
          />
        </View>
      )}
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
