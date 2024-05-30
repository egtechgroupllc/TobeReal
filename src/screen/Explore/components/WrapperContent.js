import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Category, CustomButton} from '../../../components';
import CustomText from '../../../components/CustomText';
import {COLORS, SHADOW, SIZES, images, scale} from '../../../assets/constants';
import BoxPlaceItem from './ContentAccommodation/BoxPlaceItem';
import {useLanguage} from '../../../hooks/useLanguage';

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
  dataCategory = [],
  isShadow,
  dayEndDeals,
  background,
  packageTour,
  themedTour,
  worldTour,
  discoveryTour,
  onPressSeeAll = funcFallBack,
  onPressCategory = funcFallBack,
  ...props
}) {
  const {t} = useLanguage();
  return (
    <ImageBackground source={background || images.white}>
      <View {...props} style={[styles.wrapper, styleWrapper]}>
        <View style={[styles.heading, styleHeading]}>
          <View style={styles.boxHeading}>
            {heading && (
              <CustomText
                textType="bold"
                style={[styles.text, styleTextHeading]}>
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
                {t('see_all')}
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
          <Category isObject data={dataCategory} onPress={onPressCategory} />
        )}
        {/* {packageTour && (
          <Category
            data={['Southeast Asia', 'Asia', 'Europe', 'America']}
            onPress={onPressCategory}
          />
        )} */}
        {themedTour && (
          <Category
            data={[
              'Sightseeing tour',
              'Nature tour',
              'Sea tour',
              'Other types',
            ]}
            onPress={onPressCategory}
          />
        )}
        {/* {worldTour && (
          <Category
            data={['Korean', 'Japan', 'Thailand', 'Singapore']}
            onPress={onPressCategory}
          />
        )} */}
        {discoveryTour && (
          <Category
            data={[t('dosmestic_destination'), t('international_destination')]}
            onPress={onPressCategory}
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
    </ImageBackground>
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
    fontSize: SIZES.xMedium,
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
