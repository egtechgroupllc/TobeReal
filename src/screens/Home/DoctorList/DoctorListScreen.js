/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ImageBackground,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@navigation/navigator';
import {BorderTopHeader} from '@components/Common/Header/BorderTopHeader';
import {Button, CImage, CText, MainWrapper} from '~/components';
import {IconLocation, IconSearch} from '~/assets/icon/Icon';
import {animations, COLORS, images, SIZES} from '~/assets/constants';
import Input from '~/components/Input';
import {scale} from '~/utils/scale';
import DoctorListHeader from './components/DoctorListHeader';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import EmptyData from '~/components/EmptyData';
import {getListDoctor} from '~/api/doctor';
import {ScrollView} from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import DoctorItem from './components/DoctorItem';
import {debounce} from 'lodash';
import {useLanguage} from '~/hooks/useLanguage';
import AnimatedLottieView from 'lottie-react-native';

export const DoctorListScreen = () => {
  const {navigate} = useNavigation();
  const [search, setSearch] = useState('');
  const [listDoctor, setListDoctor] = useState([]);
  const {t} = useLanguage();
  //   useEffect(() => {
  //     getDoctorlistAPI();
  //   }, []);

  //   const getDoctorlistAPI = async () => {
  //     common?.setLoading?.(true);
  //     try {
  //       const res = await GET_DOCTORS();
  //       setListDoctor(res?.data);
  //     } catch (error) {
  //     } finally {
  //       common?.setLoading?.(false);
  //     }
  //     common?.setLoading?.(false);
  //   };
  const onSearchChange = useCallback(
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
    queryKey: [...getListDoctor.queryKey, {keyword: search, limit: 10}],
    queryFn: ({pageParam}) =>
      getListDoctor({
        pageParam,
        limit: 10,
        keyword: search,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!(lastPage?.data?.length <= 0)) return allPages?.length + 1;

      return undefined;
    },
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
  // const dataFilter = useMemo(() => {
  //   if (!data?.data || !search) return data?.data;

  //   return data?.data.filter(item => {
  //     const fullName = `${item?.user?.fullname?.toLowerCase()}`;
  //     return fullName.includes(search.toLowerCase());
  //   });
  // }, [data?.data, search]);

  return (
    <MainWrapper
      scrollEnabled={false}
      sourceImage={images.backgroundHome}
      headerTitle={t('doctor_list')}>
      <View style={styles.view}>
        {/* <BorderTopHeader /> */}

        <DoctorListHeader onChangeText={onSearchChange} />
        <CText style={{fontSize: SIZES.large, color: COLORS.White}}>
          {t('list_of_doctor')}
        </CText>
        <FlatList
          data={dataArr || (isLoading && [1, 2, 3, 5])}
          keyExtractor={(_, index) => `key-list-history${index}`}
          showsVerticalScrollIndicator={false}
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
          ListEmptyComponent={<EmptyData />}
          renderItem={({item}) => (
            <DoctorItem data={item} isLoading={isLoading} />
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
      </View>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    rowGap: scale(20),
    paddingHorizontal: scale(20),
    marginTop: scale(20),
    // backgroundColor: colors.WHITE,
  },
  viewTextIP: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(40),
    backgroundColor: COLORS.White,
    borderRadius: scale(20),
    marginHorizontal: scale(20),
  },
  viewRow: {
    flexDirection: 'row',
    width: '100%',
    columnGap: scale(10),
  },
  txtInputSearch: {
    height: scale(42),
    width: scale(220),
    marginLeft: scale(5),
    color: COLORS.White,
  },

  viewLine: {
    height: 2 * StyleSheet.hairlineWidth,
    backgroundColor: COLORS.BlueBold,
  },
  txtNmSmb: {
    color: COLORS.White,
    width: scale(240),
  },
  txtMduRgl: {
    color: COLORS.White,

    marginLeft: scale(20),
    marginTop: scale(10),
  },
  imageSearch: {
    height: scale(14),
    width: scale(14),
  },
  imageBg: {
    height: scale(60),
    width: scale(60),
    borderRadius: scale(60 / 2),
  },
  imageBG: {
    flex: 1,
    justifyContent: 'center',
  },
});
