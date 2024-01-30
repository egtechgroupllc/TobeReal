import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Category, CustomButton} from '../../../components';
import CustomText from '../../../components/CustomText';
import {COLORS, SHADOW, SIZES, scale} from '../../../assets/constants';
import BoxPlaceItem from './ContentAccommodation/BoxPlaceItem';

const funcFallBack = () => {};
export default function WrapperContent({
  children,
  dataList = [],
  renderItem = funcFallBack,
  heading,
  subHeading,
  styleWrapper,
  styleContent,
  styleHeading,
  styleTextHeading,
  isSeeAll,
  isCategory,
  isShadow,
  dayEndDeals,
  onPressSeeAll = funcFallBack,
  onPressCategory = funcFallBack,
  ...props
}) {
  return (
    <View {...props} style={[styles.wrapper, styleWrapper]}>
      <View style={[styles.heading, styleHeading]}>
        <View style={styles.boxHeading}>
          {heading && (
            <CustomText textType="bold" style={[styles.text, styleTextHeading]}>
              {heading}
            </CustomText>
          )}
          {isSeeAll && (
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.primary,
                minWidth: scale(42),
                lineHeight: scale(20),
              }}
              onPress={() => onPressSeeAll()}>
              See All
            </CustomText>
          )}
        </View>

        {subHeading && (
          <View style={styles.boxSubHeading}>
            <CustomText textType="regular" style={styles.textSub}>
              {subHeading}
            </CustomText>
            {dayEndDeals && (
              <View style={styles.boxDayEndDeals}>
                <CustomText textType="semiBold" style={styles.dayEndDeals}>
                  {dayEndDeals} days !
                </CustomText>
              </View>
            )}
          </View>
        )}
      </View>

      {isCategory && (
        <Category
          data={[
            'Jakarta',
            'Bandung',
            'Tangerang',
            'Bekasi',
            'Depok',
            'Surabaya',
            'Medan',
            'Bogor',
            'Makassar (Ujung Pandang)',
            'Sumedang',
            'Sidoarjo',
            'Yogyakarta (Jogja)',
            'Semarang',
          ]}
          onChange={onPressCategory}
        />
      )}

      <View style={[styles.content, styleContent, isShadow && SHADOW]}>
        {dataList[0] && (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dataList}
            contentContainerStyle={styles.contentList}
            renderItem={({item, index}) => renderItem({item, index})}
          />
        )}
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    paddingVertical: scale(16),
    rowGap: scale(10),
  },
  heading: {
    rowGap: scale(6),
    paddingHorizontal: scale(16),
  },
  boxHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: scale(8),
    width: '100%',
  },
  text: {
    fontSize: SIZES.medium,
    flex: 1,
  },
  textSub: {
    fontSize: SIZES.xSmall,
  },
  content: {
    borderRadius: scale(12),
    // alignItems: 'center',
  },
  boxSubHeading: {
    flexDirection: 'row',
    columnGap: scale(10),
    alignItems: 'center',
  },
  boxDayEndDeals: {
    flexDirection: 'row',
    columnGap: scale(10),
    backgroundColor: '#f9dede',
    padding: scale(4),
    borderRadius: scale(6),
  },
  dayEndDeals: {
    fontSize: SIZES.small,
    color: '#de4e4e',
  },
  contentList: {
    columnGap: scale(14),
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
  },
});
