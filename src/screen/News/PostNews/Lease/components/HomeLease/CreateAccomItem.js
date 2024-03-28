import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomImage from '../../../../../../components/CustomImage';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../../assets/constants';
import {CustomButton} from '../../../../../../components';
import {IconArrowRight, IconGoBack} from '../../../../../../assets/icon/Icon';
import CustomText from '../../../../../../components/CustomText';
import {useNavigation} from '@react-navigation/native';

export default function CreateAccomItem({data}) {
  const {navigate} = useNavigation();

  const handleContinue = () => {
    navigate('AddRoomTypeScreen', data);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        !data?.rooms?.[0]
          ? handleContinue()
          : navigate('DetailAccommodationScreen');
      }}>
      <CustomImage
        source={
          'https://ik.imagekit.io/tvlk/image/imageResource/2021/11/25/1637851894841-e5d7f8e7abc30ff0f1f07f6d7a64eac1.png?tr=dpr-2,q-75,w-320'
        }
        style={{
          borderRadius: scale(7),
          minHeight: scale(160),
          width: scale(400 / 1.4),
        }}>
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            right: scale(8),
            top: scale(6),
            backgroundColor: COLORS.white,
            borderRadius: 99,
            paddingHorizontal: scale(6),
          }}>
          <CustomText
            textType="semiBold"
            style={{
              color: COLORS.error,
            }}>
            {data?.accommodation_type?.name}
          </CustomText>
        </View>
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
              }}
              numberOfLines={2}>
              {data?.name}
            </CustomText>
            <CustomText
              numberOfLines={2}
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
              text={
                data?.rooms?.[0]
                  ? 'Add Room'
                  : 'Incomplete Property Information'
              }
              buttonType="normal"
              style={styles.btnInfo}
              styleText={{
                fontSize: SIZES.xSmall,
              }}
              onPress={handleContinue}
            />

            <CustomButton
              text="Continue"
              buttonType="normal"
              style={styles.continue}
              outline
              iconRight={IconArrowRight}
              styleIcon={styles.iconCon}
              styleText={{
                fontSize: SIZES.xSmall,
              }}
              onPress={handleContinue}
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
    columnGap: scale(4),
    paddingHorizontal: 0,
  },
  iconCon: {
    color: COLORS.primary,
    width: scale(8),
    height: scale(8),
    marginTop: scale(1),
  },
});
