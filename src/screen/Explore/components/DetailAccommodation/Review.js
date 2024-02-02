import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import BottomSheet from '../../../../components/BottomSheet';
import CustomText from '../../../../components/CustomText';
import WrapperContent from '../WrapperContent';
import ItemBoxReview from './Review/ItemBoxReview';
import ReviewAll from './Review/ReviewAll';
import ListSelect from '../../../../components/ListSelect';
import { useLanguage } from '../../../../hooks/useLanguage';
const listSort = ['Latest', 'Oldest', 'Lowest score', 'Highest score'];

export default function Review() {
  const {t}= useLanguage()
  const bottomSheetRef = useRef();
  const bottomSheetChildRef = useRef();
  const [select, setSelect] = useState();

  return (
    <WrapperContent
      isSeeAll
      onPressSeeAll={() => bottomSheetRef.current.open()}
      heading={t('reviews')}>
      <View style={styles.overview}>
        <View style={styles.overviewNumberRating}>
          <CustomText textType="bold" style={styles.numberRating}>
            4.5
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
            146 {t('reviews')}
          </CustomText>
        </View>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[...Array(5)]}
        contentContainerStyle={{
          columnGap: scale(10),
          marginVertical: scale(10),
          paddingHorizontal: scale(16),
        }}
        renderItem={({item, index}) => (
          <ItemBoxReview key={`key-${item}-${index}`} />
        )}
      />

      <BottomSheet
        ref={bottomSheetRef}
        refChild={bottomSheetChildRef}
        snapPoints={['50%', '86%']}
        handleChildBottom={() => (
          <ListSelect
            data={listSort}
            onSelect={value => {
              bottomSheetChildRef.current.closeChild();
              setSelect(value);
            }}
          />
        )}
        titleIndicator="Đánh giá">
        <ReviewAll
          onSort={() => bottomSheetChildRef.current.openChild()}
          valueSort={select}
        />
      </BottomSheet>
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
  },
});
