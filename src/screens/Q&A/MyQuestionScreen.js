import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Button, CImage, CText, MainWrapper} from '~/components';
import {animations, COLORS, images, SIZES} from '~/assets/constants';
import EmptyData from '~/components/EmptyData';
import {scale} from '~/utils/scale';
import {useNavigation, useRoute} from '@react-navigation/native';
import MyQuestionItem from './components/MyQuestionItem';
import {useLanguage} from '~/hooks/useLanguage';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {IconDown} from '~/assets/icon/Icon';
import BottomSheet from '~/components/BottomSheet';
import CheckBox from '~/components/CheckBox';
import {getListSpecialty} from '~/api/common';
import {getListQuestionDoctor, getListQuestionUser} from '~/api/question';
import LottieView from 'lottie-react-native';
import AnimatedLottieView from 'lottie-react-native';

export default function MyQuestionScreen() {
  const bottomSheetRef = useRef();
  const [type, setType] = useState('');
  const {navigate} = useNavigation();
  const {params} = useRoute();
  const {t} = useLanguage();

  const ListTab = [
    {id: 'APPROVED', name: t('approved')},
    {id: 'PENDING', name: t('pending')},
  ];
  const [tab, setTab] = useState('APPROVED');

  const {
    data: dataSpecialty,
    isLoading: isLoadingSpecialty,
    error: errorSpecialty,
  } = useQuery({
    queryKey: [
      ...getListSpecialty.queryKey,
      {keyword: '', limit: 999, pageParam: 1},
    ],
    queryFn: () => getListSpecialty({keyword: '', limit: 999, pageParam: 1}),
  });
  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    isError,
  } = useInfiniteQuery({
    queryKey: params?.doctor
      ? [
          ...getListQuestionDoctor.queryKey,
          {specialty_id: type, limit: 10, status: tab, keyword: ''},
        ]
      : [
          ...getListQuestionUser.queryKey,
          {
            specialty_id: type,
            limit: 10,
            status: tab,
            keyword: '',
          },
        ],
    queryFn: ({pageParam}) =>
      params?.doctor
        ? getListQuestionDoctor({
            pageParam,
            limit: 10,
            specialty_id: type,
            status: tab,
            keyword: '',
          })
        : getListQuestionUser({
            pageParam,
            limit: 10,
            specialty_id: type,
            status: tab,
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

  useEffect(() => {
    setType(data?.data?.[0]?.id);
  }, [data?.data?.[0]?.id]);

  const handleSelect = data => {
    setType(data);
    bottomSheetRef.current.close();
  };
  const queryClient = useQueryClient();

  const refresh = useRef(false);
  function pullToRefresh(value) {
    refresh.current = true;
    queryClient.invalidateQueries();
    refresh.current = false;
  }

  return (
    <MainWrapper
      scrollEnabled={false}
      styleContent={{paddingTop: scale(20)}}
      sourceImage={images.backgroundHome}
      headerTitle={t('my_questions')}>
      <View style={styles.contain}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            columnGap: scale(10),
            paddingRight: scale(20),
          }}>
          {ListTab?.map(item => {
            return (
              <TouchableOpacity
                onPress={() => setTab(item?.id)}
                style={{
                  height: scale(30),
                  backgroundColor: tab === item?.id ? COLORS.cyan : COLORS.grey,
                  width: scale(120),
                  justifyContent: 'center',
                  borderRadius: scale(20),
                  alignItems: 'center',
                }}>
                <CText
                  style={{
                    color: tab === item?.id ? COLORS.White : COLORS.black,
                  }}>
                  {item?.name}
                </CText>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <Button
            onPress={() => bottomSheetRef.current.open()}
            title={t('list_type_questions')}
            backgroundColor="transparent"
            styleContent={{
              borderWidth: scale(1),
              borderRadius: scale(5),
              borderColor: COLORS.White,
              justifyContent: 'flex-start',
            }}
            Icon={IconDown}
          />
        </View>
        <FlatList
          data={dataArr || (isLoading && [1, 2, 3, 5])}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => `key-list-question${index}`}
          ListEmptyComponent={<EmptyData />}
          contentContainerStyle={{paddingBottom: scale(50), rowGap: scale(10)}}
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
          refreshControl={
            <RefreshControl
              refreshing={refresh.current}
              onRefresh={pullToRefresh}
              tintColor={COLORS.White}
            />
          }
          renderItem={({item, index}) => {
            return tab === 'APPROVED' ? (
              <MyQuestionItem
                data={item}
                isLoading={isLoading}
                doctor={params?.doctor}
              />
            ) : (
              tab === 'PENDING' && (
                <MyQuestionItem
                  data={item}
                  isLoading={isLoading}
                  pending={true}
                  doctor={params?.doctor}
                />
              )
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
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={['50%', '80%']}
          titleIndicator={t('list_type_questions')}
          // onDismiss={!apply && reset}
          styleContent={{
            paddingHorizontal: scale(16),
            rowGap: scale(16),
            paddingBottom: scale(100),
          }}>
          <TouchableOpacity
            key="all"
            onPress={() => {
              setType(''), bottomSheetRef.current.close();
            }}
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CText style={{fontSize: SIZES.medium, color: COLORS.White}}>
              {t('all')}
            </CText>
            <CheckBox
              isRadio
              isChecked={type === ''}
              textStyle={{
                fontSize: SIZES.xMedium,
              }}
            />
          </TouchableOpacity>
          {dataSpecialty?.data?.rows?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(item?.id)}
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <CText style={{fontSize: SIZES.medium, color: COLORS.White}}>
                  {t(item?.name)}
                </CText>
                <CheckBox
                  key={index}
                  textBold
                  isRadio
                  // text={item}
                  isChecked={type === item?.id}
                  // onPress={() => setUserBooking(item)}
                  textStyle={{
                    fontSize: SIZES.xMedium,
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </BottomSheet>
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    rowGap: scale(20),
  },
});
