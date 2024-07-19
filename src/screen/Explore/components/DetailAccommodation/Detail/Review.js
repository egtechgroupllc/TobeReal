import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View, TextStyle} from 'react-native';
import {getListReviewAccmo} from '../../../../../Model/api/apiAccom';
import {COLORS, FONTS, SIZES, scale} from '../../../../../assets/constants';
import BottomSheet from '../../../../../components/BottomSheet';
import CustomText from '../../../../../components/CustomText';
import {useLanguage} from '../../../../../hooks/useLanguage';
import WrapperContent from '../../WrapperContent';
import ItemBoxReview from '../Review/ItemBoxReview';
import ReviewAll from '../Review/ReviewAll';
import BottomSheetListSelect from '../../../../../components/BottomSheetListSelect';
import {formatNumber, formatPrice} from '../../../../../utils/format';
import ItemBoxReviewLoading from '../Review/ItemBoxReviewLoading';
const listSort = ['Latest', 'Oldest', 'Lowest score', 'Highest score'];

export default function Review({dataP}) {
  const {t} = useLanguage();
  const bottomSheetRef = useRef();
  const bottomSheetChildRef = useRef();
  const [select, setSelect] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.open();
    }
  }, [isOpen]);

  const {data, isLoading} = useQuery({
    queryKey: ['accommodation', 'list-review', dataP.id],
    queryFn: () => getListReviewAccmo({id_accomo: dataP.id, limit: 6}),
  });
  return (
    <WrapperContent
      isSeeAll
      onPressSeeAll={() => setIsOpen(true)}
      heading={t('reviews')}>
      {dataP?.review_count ? (
        <>
          <View style={styles.overview}>
            <View style={styles.overviewNumberRating}>
              <CustomText textType="bold" style={styles.numberRating}>
                {formatPrice(dataP?.review_average, {
                  showCurrency: false,
                  decimalPlaces: 2,
                }) || 0}
              </CustomText>
            </View>

            <View
              style={{
                rowGap: scale(3),
              }}>
              <CustomText
                textType="bold"
                style={{fontSize: SIZES.xMedium, color: COLORS.primary}}>
                {t('overview')}
              </CustomText>
              <CustomText style={{fontSize: SIZES.xMedium}}>
                {formatNumber(dataP?.review_count)}{' '}
                {dataP?.review_count > 1 ? t('reviews') : t('review')}
              </CustomText>
            </View>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data?.data?.rows || (isLoading && [...Array(2)])}
            contentContainerStyle={{
              columnGap: scale(10),
              marginVertical: scale(10),
              paddingHorizontal: scale(16),
            }}
            renderItem={({item, index}) =>
              item?.id ? (
                <ItemBoxReview key={`key-${item}-${index}`} data={item} />
              ) : (
                <ItemBoxReviewLoading />
              )
            }
          />

          {isOpen && (
            <BottomSheet
              ref={bottomSheetRef}
              refChild={bottomSheetChildRef}
              snapPoints={['50%', '86%']}
              onDismiss={() => {
                setIsOpen(false);
              }}
              handleChildBottom={() => (
                <BottomSheetListSelect
                  data={listSort}
                  onChange={value => {
                    bottomSheetChildRef.current.closeChild();
                    setSelect(value);
                  }}
                />
              )}
              titleIndicator={t('review')}>
              <ReviewAll
                onSort={() => bottomSheetChildRef.current.openChild()}
                valueSort={select}
                id_accomo={dataP.id}
                dataP={dataP}
              />
            </BottomSheet>
          )}
        </>
      ) : (
        <View style={{alignItems: 'center'}}>
          <CustomText
            textType="semiBold"
            style={{fontSize: SIZES.small, color: COLORS.grey}}>
            {t('there_are_no_one_review')}
          </CustomText>
        </View>
      )}
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  overview: {
    flexDirection: 'row',
    columnGap: scale(10),
    alignItems: 'center',
    paddingHorizontal: scale(16),
  },
  overviewNumberRating: {
    backgroundColor: COLORS.primary,
    borderRadius: scale(6),
  },
  numberRating: {
    fontSize: SIZES.xMedium,
    color: COLORS.white,
    padding: scale(10),
    minWidth: scale(40),
    textAlign: 'center',
  },
});
