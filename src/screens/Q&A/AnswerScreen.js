import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Button, CText, MainWrapper} from '~/components';
import {animations, COLORS, images, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {useLanguage} from '~/hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {getListSpecialty, getListTypeQuestion} from '~/api/common';
import EmptyData from '~/components/EmptyData';
import QuestionItem from './components/QuestionItem';
import BottomSheet from '~/components/BottomSheet';
import CheckBox from '~/components/CheckBox';
import {IconDown} from '~/assets/icon/Icon';
import LottieView from 'lottie-react-native';
import {getListQuestion, getListQuestionPending} from '~/api/question';
const fake = [
  {
    name: '312312',
    des: 'dsadsadsa',
    q: 'ewqeqw',
    avatar: images.iconProfile,

    images: [
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 1,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 2,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 3,
        description: 'dsadsadas',
      },
    ],
  },
  {
    name: '312312',
    des: 'dsadsadsa',
    q: 'ewqeqw',
    avatar: images.iconProfile,

    images: [
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 1,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 2,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 3,
        description: 'dsadsadas',
      },
    ],
  },
  {
    name: '312312',
    des: 'dsadsadsa',
    q: 'ewqeqw',
    avatar: images.iconProfile,

    images: [
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 1,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 2,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 3,
        description: 'dsadsadas',
      },
    ],
  },
  {
    name: '312312',
    des: 'dsadsadsa',
    q: 'ewqeqw',
    avatar: images.iconProfile,

    images: [
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 1,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 2,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 3,
        description: 'dsadsadas',
      },
    ],
  },
  {
    name: '312312',
    des: 'dsadsadsa',
    q: 'ewqeqw',
    avatar: images.iconProfile,

    images: [
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 1,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 2,
        description: 'dsadsadas',
      },
      {
        url: 'https://apinowcare.toearnnow.com/images/2819594_ProviderProfileImage_0264d23c-00d5-4003-97ef-dd86de76fc4f%20(1).webp',
        id: 3,
        description: 'dsadsadas',
      },
    ],
  },
];
export default function AnswerScreen() {
  const bottomSheetRef = useRef();
  const {t} = useLanguage();
  const [type, setType] = useState('');
  const {navigate} = useNavigation();
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
    queryKey: [
      ...getListQuestionPending.queryKey,
      {keyword: '', limit: 10, status: 'APPROVED', specialty_id: type},
    ],
    queryFn: ({pageParam}) =>
      getListQuestionPending({
        pageParam,
        limit: 10,
        keyword: '',
        status: 'APPROVED',
        specialty_id: type,
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
      sourceImage={images.backgroundHome}
      scrollEnabled={false}
      styleContent={{paddingTop: scale(30), rowGap: scale(20)}}
      headerTitle={t('answer_questions')}>
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
        contentContainerStyle={{
          rowGap: scale(10),
          paddingBottom: scale(100),
        }}
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
          return (
            <QuestionItem data={item} isLoading={isLoading} pending={true} />
          );
        }}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={['50%', '80%']}
        titleIndicator={t('list_type_questions')}
        // onDismiss={!apply && reset}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(16),
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
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
