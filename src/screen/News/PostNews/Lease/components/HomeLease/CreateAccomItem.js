import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomImage from '../../../../../../components/CustomImage';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../../assets/constants';
import {CustomButton} from '../../../../../../components';
import {IconGoBack} from '../../../../../../assets/icon/Icon';
import CustomText from '../../../../../../components/CustomText';

export default function CreateAccomItem({data}) {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <CustomImage
        source={
          'https://ik.imagekit.io/tvlk/image/imageResource/2021/11/25/1637851894841-e5d7f8e7abc30ff0f1f07f6d7a64eac1.png?tr=dpr-2,q-75,w-320'
        }
        style={{
          borderRadius: scale(7),
          minHeight: scale(160),
          ...SHADOW,
          width: scale(400 / 1.4),
        }}>
        <View
          style={{
            backgroundColor: COLORS.overlay,
            flex: 1,
          }}>
          <View style={styles.content}>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.white,
              }}>
              {data?.name}
            </CustomText>
            <CustomText
              style={{
                color: COLORS.white,
                fontSize: SIZES.xSmall,
              }}>
              {data?.address}
            </CustomText>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.white,
                fontSize: SIZES.xSmall,
              }}>
              RegID: {data?.id}
            </CustomText>
          </View>

          <View style={styles.bottom}>
            <CustomButton
              text="Incomplete Property Information"
              buttonType="normal"
              style={styles.btnInfo}
              styleText={{
                fontSize: SIZES.xSmall,
              }}
            />

            <CustomButton
              text="Continue"
              buttonType="normal"
              style={styles.continue}
              outline
              iconRight={IconGoBack}
              styleIcon={{
                color: COLORS.primary,
              }}
              styleText={{
                fontSize: SIZES.xSmall,
              }}
            />
          </View>
        </View>
      </CustomImage>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: scale(10),
    rowGap: scale(3),
  },
  bottom: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    padding: scale(8),
    marginTop: 'auto',
    columnGap: scale(4),
    justifyContent: 'space-between',
  },
  btnInfo: {
    height: scale(26),
    minWidth: scale(180),
    maxWidth: scale(260),
    paddingHorizontal: scale(6),
  },
  continue: {
    height: scale(26),
    borderWidth: 0,
    minWidth: scale(80),
    columnGap: scale(2),
    paddingHorizontal: 0,
  },
});
