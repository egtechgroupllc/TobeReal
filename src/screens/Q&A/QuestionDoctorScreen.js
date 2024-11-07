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
import {useLanguage} from '~/hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {getListSpecialty, getListTypeQuestion} from '~/api/common';
import {scale} from '~/utils/scale';
import {IconDown} from '~/assets/icon/Icon';
import EmptyData from '~/components/EmptyData';
import QuestionItem from './components/QuestionItem';
import BottomSheet from '~/components/BottomSheet';
import CheckBox from '~/components/CheckBox';
import {getListQuestion} from '~/api/question';
import LottieView from 'lottie-react-native';
import AnimatedLottieView from 'lottie-react-native';
import {useCountry} from '~/hooks/useCountry';
export default function QuestionDoctorScreen() {
  const bottomSheetRef = useRef();
  const {t} = useLanguage();
  const [type, setType] = useState('');
  const {navigate} = useNavigation();
  const {country} = useCountry();
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
      ...getListQuestion.queryKey,
      {keyword: '', limit: 10, status: 'APPROVED', specialty_id: type},
    ],
    queryFn: ({pageParam}) =>
      getListQuestion({
        pageParam,
        limit: 10,
        keyword: '',
        status: 'APPROVED',
        country_id: country?.id,
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
      scrollEnabled={false}
      sourceImage={images.backgroundHome}
      styleContent={{paddingTop: scale(30), rowGap: scale(20)}}
      headerTitle={t('questions_answers')}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(10),
          alignSelf: 'center',
          width: '90%',
        }}>
        <Button
          style={{flex: 1}}
          sizeButton="small"
          title={t('answer_questions')}
          linearGradientProps={{
            colors: COLORS.linearButton,
          }}
          onPress={() => navigate('NoBottomTab', {screen: 'AnswerScreen'})}
        />
        <Button
          style={{flex: 1}}
          sizeButton="small"
          title={t('my_questions')}
          linearGradientProps={{
            colors: [COLORS.grey, COLORS.grey],
          }}
          onPress={() =>
            navigate('NoBottomTab', {
              screen: 'MyQuestionScreen',
              params: {doctor: true},
            })
          }
        />
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
            item?.status === 'APPROVED' && (
              <QuestionItem data={item} isLoading={isLoading} home={true} />
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
