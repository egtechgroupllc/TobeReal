import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Category, CustomButton} from '../../../components';
import CustomText from '../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../assets/constants';

const funcFallBack = () => {};
export default function WrapperContent({
  children,
  heading,
  subHeading,
  styleWrapper,
  isSeeAll,
  isCategory,
  onPressSeeAll = funcFallBack,
  onPressCategory = funcFallBack,
}) {
  return (
    <View style={[styles.wrapper, styleWrapper]}>
      <View style={styles.heading}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            columnGap: scale(8),
          }}>
          {heading && (
            <CustomText textType="bold" style={styles.text}>
              {heading}
            </CustomText>
          )}
          {isSeeAll && (
            <CustomText
              textType="bold"
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
          <CustomText textType="regular" style={styles.textSub}>
            {subHeading}
          </CustomText>
        )}
      </View>

      {isCategory && (
        <Category
          data={[
            'Jakarta',
            'Bandung',
            'Tangerang',
            'Jakarta',
            'Bandung',
            'Tangerang',
          ]}
          onPress={onPressCategory}
        />
      )}

      <View style={styles.content}>{children}</View>
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
  text: {
    fontSize: SIZES.medium,
    flex: 1,
  },
  textSub: {
    fontSize: SIZES.xSmall,
  },
  content: {},
});
