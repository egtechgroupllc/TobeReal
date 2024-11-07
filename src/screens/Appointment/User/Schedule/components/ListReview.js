import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {scale} from '~/utils/scale';
import {Button, CImage, CText} from '~/components';
import {COLORS, SIZES} from '~/assets/constants';
import EmptyData from '~/components/EmptyData';
import BottomSheet from '~/components/BottomSheet';
import {useLanguage} from '~/hooks/useLanguage';
import StarRating from '~/screens/Products/ListProduct/components/StarRating';
import ImageDetail from '~/components/ChoosePhoto/ImageDetail';
const fake = [
  {
    name: 'THS.BS. Tran Tuan Kiet',
    content: '294 khuong viet',
    date: '10/09/2024',
  },
  {
    name: '312312',
    content: 'ewcontentecontentw',
    date: '10/09/2024',
  },
  {
    name: '312312',
    content: 'ewcontentecontentw',
    date: '10/09/2024',
  },
  {
    name: '312312',
    content: 'ewcontentecontentw',
    date: '10/09/2024',
  },
  {
    name: '312312',
    content: 'ewqeqw',
    date: '10/09/2024',
  },
];
export default function ListReview({data}) {
  const bottomSheetRef = useRef();
  const {t} = useLanguage();

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <CText
          numberOfLines={1}
          style={{color: COLORS.White, fontSize: SIZES.medium, flex: 1}}
          textType="semiBold">
          {t('patient_feedback')}
        </CText>
        <Button.Text
          title={`${t('see_all')} \n (${data?.review_doctor?.length} ${t(
            'review',
          )})`}
          styleText={{color: COLORS.blue, textAlign: 'center'}}
          onPress={() => bottomSheetRef.current.open()}
        />
      </View>
      <View
        style={{
          alignItems: data?.review_doctor?.length < 1 ? 'center' : 'flex-start',
        }}>
        <FlatList
          data={data?.review_doctor?.slice(0, 2)}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `key-list-review-doctor-${index}`}
          ListEmptyComponent={<EmptyData />}
          contentContainerStyle={{
            paddingVertical: scale(10),
            columnGap: scale(20),
          }}
          renderItem={({item, index}) => {
            return (
              <View
                key={item?.id}
                style={{
                  backgroundColor: COLORS.overlay,
                  height: scale(150),
                  borderRadius: scale(10),
                  paddingVertical: scale(15),
                  paddingHorizontal: scale(10),
                  width: scale(250),
                  rowGap: scale(5),
                }}>
                <StarRating rating={item?.rating} />
                <CText
                  numberOfLines={1}
                  style={{color: COLORS.White, fontSize: SIZES.xMedium}}
                  textType="bold">
                  {item?.user?.fullname}
                </CText>
                <CText
                  numberOfLines={4}
                  style={{color: COLORS.White, fontSize: SIZES.xMedium}}
                  textType="regular">
                  {item?.content}
                </CText>
                <CText
                  numberOfLines={2}
                  style={{color: COLORS.cyan, fontSize: SIZES.xMedium}}
                  textType="medium">
                  {t('examined_on_date')}: {item?.appointment?.date}
                </CText>
              </View>
            );
          }}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={['60%', '80%']}
        titleIndicator={t('patient_feedback_after_examination')}
        // onDismiss={!apply && reset}
        styleContent={{
          paddingHorizontal: scale(16),
          rowGap: scale(16),
        }}>
        <FlatList
          data={data?.review_doctor}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `key-list-review-doctor-${index}`}
          ListEmptyComponent={<EmptyData />}
          contentContainerStyle={{
            paddingVertical: scale(10),
            rowGap: scale(20),
            alignItems: 'center',
          }}
          renderItem={({item, index}) => {
            return (
              <View
                key={item?.id}
                style={{
                  backgroundColor: COLORS.input,
                  minHeight: scale(200),
                  width: scale(350),
                  borderRadius: scale(10),
                  paddingVertical: scale(15),
                  paddingHorizontal: scale(20),
                  rowGap: scale(10),
                }}>
                <StarRating rating={item?.rating} />
                <CText
                  numberOfLines={1}
                  style={{color: COLORS.White, fontSize: SIZES.xMedium}}
                  textType="bold">
                  {item?.user?.fullname}
                </CText>
                <View
                  style={{
                    flexDirection: 'row',
                    columnGap: scale(10),
                  }}>
                  {item?.files && item?.files?.length > 0 && (
                    <ImageDetail
                      arrImg={item?.files}
                      styleWrapper={{height: scale(100), width: scale(100)}}
                    />
                  )}
                  <CText
                    numberOfLines={4}
                    style={{color: COLORS.White, fontSize: SIZES.xMedium}}
                    textType="regular">
                    {item?.content}
                  </CText>
                </View>
                <CText
                  numberOfLines={1}
                  style={{color: COLORS.cyan, fontSize: SIZES.xMedium}}
                  textType="medium">
                  {t('examined_on_date')}: {item?.appointment?.date}
                </CText>
              </View>
            );
          }}
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({});
