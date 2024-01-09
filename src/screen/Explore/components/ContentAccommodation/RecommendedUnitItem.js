import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES, WIDTH, scale} from '../../../../assets/constants';
import {CustomButton} from '../../../../components';
import {IconCity} from '../../../../assets/icon/Icon';
import CustomText from '../../../../components/CustomText';

export default function RecommendedUnitItem({
  isButtonBottom,
  isShowDetail,
  styesWrapper,
}) {
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        resizeMode="stretch"
        src="https://cdn.travelio.id/hotel/b6906-6538c063f4bc0a28cbe6e5e9/Deluxe-King_l.jpg"
        style={{...styles.img, ...styesWrapper}}>
        <CustomText textType="bold" style={styles.title}>
          Terdekat ke Stasiun LRT Cawang
        </CustomText>

        {isShowDetail && (
          <View style={styles.detail}>
            <View style={styles.detailContent}>
              <CustomText style={styles.detailText}>
                <IconCity style={styles.icon} fill={COLORS.white} /> Terdekat
              </CustomText>

              <View
                style={{
                  height: '100%',
                  width: scale(1),
                  backgroundColor: '#fff',
                }}
              />

              <CustomText style={styles.detailText}>
                <IconCity style={styles.icon} fill={COLORS.white} /> Terdekat
              </CustomText>
            </View>
            <CustomText
              textType="semiBold"
              style={styles.detailText}
              numberOfLines={1}>
              Terdekat ke Stasiun LRT Cawang
            </CustomText>
          </View>
        )}
      </ImageBackground>

      {isButtonBottom && (
        <CustomButton
          buttonType="large"
          text="Dekat Stasiun LRT"
          styleText={styles.btnText}
          iconRight={IconCity}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    rowGap: scale(10),
  },
  img: {
    width: (WIDTH.widthScreen > 500 ? scale(500) : WIDTH.widthScreen) / 2,
    aspectRatio: 1.4,
    borderRadius: scale(12),
    overflow: 'hidden',
    padding: scale(10),
  },
  title: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  detail: {
    flex: 1,
    justifyContent: 'flex-end',
    rowGap: scale(4),
  },
  detailContent: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(10),
  },
  detailText: {
    fontSize: SIZES.xSmall,
    color: COLORS.white,
  },
  icon: {
    width: scale(12),
    height: scale(12),
  },
  btnText: {
    fontSize: SIZES.xMedium,
    textType: 'semiBold',
    color: COLORS.text,
  },
});
