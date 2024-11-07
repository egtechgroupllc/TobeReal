import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {scale} from '~/utils/scale';
import EmptyData from '~/components/EmptyData';
import CText from '~/components/CText';
import {animations, COLORS, images, SIZES} from '~/assets/constants';
import CheckBox from '~/components/CheckBox';
import MainWrapper from '~/components/MainWrapper';
import CImage from '~/components/CImage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button} from '~/components';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getListSpecialty} from '~/api/common';
import {useAuthentication} from '~/hooks/useAuthentication';
import LottieView from 'lottie-react-native';
import {debounce} from 'lodash';
import SpecialtyItem from './Schedule/components/SpecialtyItem';
import {useLanguage} from '~/hooks/useLanguage';
import Input from '~/components/Input';
import {IconSearch} from '~/assets/icon/Icon';
import AnimatedLottieView from 'lottie-react-native';
export default function ListSpecialtyScreen() {
  const [search, setSearch] = useState('');
  const params = useRoute().params;
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const [select, setSelect] = useState(
    params?.isSelectOne
      ? params?.dataSpecialty || ''
      : params?.dataSpecialty || [],
  );
  const {token} = useAuthentication();
  const {goBack} = useNavigation();
  const handlePress = (item, index) => {
    if (params?.isSelectOne) {
      setSelect(item?.id);
    } else {
      setSelect(prev =>
        prev.includes(item?.id)
          ? prev.filter(i => i !== item?.id)
          : [...prev, item?.id],
      );
    }
  };

  const onChangeText = useCallback(
    debounce(text => {
      setSearch(text);
    }, 500),
    [],
  );
  // Hàm lọc dữ liệu dựa trên từ khóa tìm kiếm
  const handleConfirm = useCallback(() => {
    if (params?.onGoBack) {
      params.onGoBack(select); // Gọi hàm onGoBack với dữ liệu select
    }
    if (params?.openBottomSheet) {
      params.openBottomSheet(); // Mở lại BottomSheet của màn hình trước
    }
    goBack(); // Quay lại màn hình trước
  }, [select]);
  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    isError,
  } = useInfiniteQuery({
    queryKey: [...getListSpecialty.queryKey, {keyword: search, limit: 10}],
    queryFn: ({pageParam}) =>
      getListSpecialty({
        pageParam,
        limit: 10,
        keyword: '',
      }),
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
  const dataSearch = useMemo(() => {
    return dataArr?.filter(item =>
      t(item.name).toLowerCase().includes(search.toLowerCase()),
    );
  }, [dataArr, search]);

  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      scrollEnabled={false}
      headerTitle={t('list_specialties')}
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
      {/* <AppointmentHeader onChangeText={onChangeText} search /> */}
      <FlatList
        data={dataSearch || (isLoading && [1, 2, 3, 5])}
        numColumns={2}
        columnWrapperStyle={{
          columnGap: scale(15),
        }}
        contentContainerStyle={{
          paddingBottom: scale(100),
          rowGap: scale(10),
        }}
        showsVerticalScrollIndicator={false}
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
        renderItem={({item, index}) => {
          return (
            <SpecialtyItem
              data={item}
              params={params}
              onPress={handlePress}
              select={select}
              isLoading={isLoading}
            />
          );
        }}
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
