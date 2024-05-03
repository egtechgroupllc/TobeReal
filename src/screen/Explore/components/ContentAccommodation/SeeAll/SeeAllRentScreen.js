import React, {
  useDeferredValue,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';

import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../../../hooks/useLanguage';
import SearchChooseLocation from './SearchChooseLocation';
import SearchRecent from './SearchRecent';
import MainWrapper from '../../../../../components/MainWrapper';

import FilterMore from './FilterMore';
// import BoxPlaceItem from './components/BoxPlaceItem';
import {getListRent} from '../../../../../Model/api/apiAccom';
import {formatDate} from '../../../../../utils/format';
import {useQuery} from '@tanstack/react-query';
import BoxPlaceItem from '../BoxPlaceItem';
import {type} from '../../../../../components/CustomText';
import EmptyData from '../../../../../components/EmptyData';
import {useForm} from 'react-hook-form';
import BoxPlaceItemLoading from '../BoxPlaceItem/BoxPlaceItemLoading';

export default function SeeAllRentScreen({route}) {
  const [filter, setFilter] = useState();
  const {control, setValue, watch, handleSubmit} = useForm();
  const timer = useRef(null);
  useEffect(() => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      timer.current = null;
      setValue('nameSearch', watch('name'));
    }, 400);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('name')]);

  const {data, isLoading, isError, error} = useQuery({
    queryKey: [
      'accommodation',
      'list-rent',
      {
        accommodation_type_id: filter?.type,
        country_id: 241,
        max_price: filter?.max_price,
        min_price: filter?.min_price,
        number_occupancy: filter?.adult,
        number_room: filter?.room,
        // province_id: 1,
        name: watch('nameSearch'),
      },
    ],
    queryFn: () =>
      getListRent({
        date_end: formatDate(new Date(), {addDays: 1}),
        date_start: formatDate(),
        country_id: 241,
        accommodation_type_id: filter?.type,
        max_price: filter?.max_price,
        min_price: filter?.min_price,
        number_occupancy: filter?.adult,
        number_room: filter?.room,
        // province_id: 1,
        name: watch('nameSearch'),
      }),
  });
  const {title} = route.params;
  const {navigate, setOptions} = useNavigation();
  const {t} = useLanguage();
  const Press = () => {
    navigate(t('explore'), {
      screen: 'HomeExploreScreen',
    });
  };
  const handleSelectSearch = value => {
    navigate(t('explore'), {
      screen: 'HomeExploreScreen',
      params: value,
    });
  };

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: title,
    });
  }, []);
  return (
    <MainWrapper>
      <View style={styles.content}>
        <SearchChooseLocation onPress={handleSelectSearch} control={control} />
        {/* <SearchRecent onPress={handleSelectSearch} /> */}
        <FilterMore
          onFilter={value => setFilter(value)}
          control={control}
          setValue={setValue}
          watch={watch}
          handleSubmit={handleSubmit}
        />
      </View>
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: scale(60),
          position: 'absolute',
          width: '100%',
        }}
      />
      <FlatList
        // horizontal
        scrollEnabled={false}
        numColumns={2}
        columnWrapperStyle={{
          columnGap: scale(10),
        }}
        ListEmptyComponent={() => <EmptyData />}
        showsVerticalScrollIndicator={false}
        data={data?.data?.rows || (isLoading && [...Array(4)])}
        style={{
          columnGap: scale(10),
        }}
        contentContainerStyle={styles.content1}
        renderItem={({item, index}) =>
          item?.id ? (
            <BoxPlaceItem
              isHeart
              isStar
              data={item}
              key={index}
              rental="night"
            />
          ) : (
            <BoxPlaceItemLoading
              style={{
                width: '50%',
              }}
            />
          )
        }
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '86%',
    alignSelf: 'center',
    rowGap: scale(14),
    zIndex: 99,
  },
  content1: {
    // alignItems: 'center',
    paddingHorizontal: scale(30),
    rowGap: scale(14),
    marginTop: scale(10),
    paddingVertical: scale(6),
    paddingBottom: scale(100),
  },
  buttonStyle: {
    width: '100%',
  },
});
